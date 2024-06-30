const express = require("express");
const app = express();
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const User = require("../models/user.js");
const Notification = require("../models/notification.js");
const MatchRequest = require("../models/matchRequest.js");
const AcceptedRequest = require("../models/acceptedRequest.js");
const { sendchatNotification } = require("../firebase/service/index.js");
const { ObjectID, ObjectId } = require("mongodb");

const userMatchController = {
  //.......................................userMatch..................................//

  async  userMatch(req, res, next) {
    try {
      const userId = req.user?._id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const userGender = user.gender;
      const gender = userGender === "male" ? "female" : "male";
      const matchType = req.query.matchType;
  
      const {
        partnerAge,
        partnerMaritalStatus,
        partnerHeight,
        education,
        partnerOccupation,
        partnerMotherTongue,
        partnerAnnualIncome,
        partnerSect,
        partnerCity
      } = user.partnerPreference || {};
  
      let matchedUsers;
  
      if (matchType === "newUsers") {
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  
        const excludedUserIds = [
          ...user.sentInterests,
          ...user.receivedInterests,
          ...user.friends,
          userId 
        ];
  
        matchedUsers = await User.find({
          _id: { $nin: excludedUserIds },
          gender: gender,
          createdAt: { $gte: oneYearAgo }
        });
  
      } else if (matchType === "match") {
        const [minAge, maxAge] = (partnerAge || "").split("-").map(age => parseInt(age, 10));
        const [minIncome, maxIncome] = (partnerAnnualIncome || "").split("-").map(income => {
          if (income.includes("Lac")) {
            return parseFloat(income) * 100000;
          }
          return parseFloat(income);
        });
  
        const baseMatchCriteria = {
          gender: gender,
          _id: { $nin: [userId] } 
        };
  
        const flexibleMatchCriteria = {
          $or: [
            { age: { $gte: minAge || 0, $lte: maxAge || 100 } },
            { occupation: partnerOccupation },
            { city: partnerCity }
          ]
        };
  
        if (partnerMaritalStatus) {
          flexibleMatchCriteria.$or.push({ maritalStatus: partnerMaritalStatus });
        }
        if (education) {
          flexibleMatchCriteria.$or.push({ highestDegree: education });
        }
        if (partnerMotherTongue) {
          flexibleMatchCriteria.$or.push({ motherTongue: partnerMotherTongue });
        }
        if (minIncome !== undefined && maxIncome !== undefined) {
          flexibleMatchCriteria.$or.push({ annualIncome: { $gte: minIncome, $lte: maxIncome } });
        }
        if (partnerSect) {
          flexibleMatchCriteria.$or.push({ sect: partnerSect });
        }
  
        matchedUsers = await User.find({
          $and: [baseMatchCriteria, flexibleMatchCriteria]
        });
      } else {
        return res.status(400).json({ message: "Invalid matchType" });
      }
  
      res.json({ matchedUsers });
    } catch (error) {
      console.error("Error in userMatch:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async  newUsers(req, res)  {
    try {
      const userId = req.user?._id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const userGender = user.gender;
      const targetGender = userGender === "male" ? "female" : "male";
  
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
      const excludedUserIds = [
        ...user.sentInterests,
        ...user.receivedInterests,
        ...user.friends,
        userId
      ];
  
      const newUsers = await User.find({
        _id: { $nin: excludedUserIds },
        gender: targetGender,
        createdAt: { $gte: sevenDaysAgo }
      }).select('-password -__v');
  
      res.json({ newUsers });
    } catch (error) {
      console.error("Error in fetching new users:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  //.......................................RecentlyViewed..................................//

  async recentlyViewed(req, res, next) {
    const viewerId = req.user._id;
    const viewedUserId = req.body.userId; 

    try {
      const viewerUser = await User.findById(viewerId);

      if (!viewerUser) {
        return res.status(404).json({ error: "Viewer user not found" });
      }

      if (!viewerUser.recentlyViewed) {
        viewerUser.recentlyViewed = [];
      }

      if (
        viewerUser.recentlyViewed.length > 0 &&
        viewerUser.recentlyViewed[0].toString() === viewedUserId
      ) {
        return res.json({
          success: true,
          message: "User already in the most recent position",
        });
      }

      // Remove viewedUserId if it's already in the array
      viewerUser.recentlyViewed = viewerUser.recentlyViewed.filter(
        id => id.toString() !== viewedUserId
      );

      // Add viewedUserId to the most recent position
      viewerUser.recentlyViewed.unshift(viewedUserId);

      // Save the updated user document
      await viewerUser.save();

      res.json({ success: true, message: "User added to recently viewed" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getRecentViewed(req, res, next) {
    try {
      const userId = req.user._id;
      const user = await User.findById(userId).populate({
        path: "recentlyViewed",
        model: User
      });
  
      if (!user) {
        return res.status(404).json({ error: "user not found" });
      }
  
      res.json({ success: true, recentlyViewed: user.recentlyViewed });
    } catch (error) {
      next(error);
    }
  }
  
,

  
  //.......................................SendInterest..................................//

  async sendInterest(req, res, next) {
    const interestSchema = Joi.object({
      senderId: Joi.string(),
      receiverId: Joi.string().required(),
    });
    const { error } = interestSchema.validate(req.body);
  
    if (error) {
      return next(error);
    }
  
    const { receiverId } = req.body;
    const senderId = req.user._id;
    let receiver;
    let sender;
    let updatedSender;
    let updatedReceiver;
  
    try {
      // Find the receiver
      receiver = await User.findOne({ _id: receiverId });
  
      if (!receiver) {
        const error = {
          status: 401,
          message: "Invalid receiverId",
        };
        return next(error);
      }
  
      const matchRequest = new MatchRequest({
        senderId,
        receiverId,
      });
      await matchRequest.save();
  
      // Find the sender
      sender = await User.findOne({ _id: senderId });
  
      const notification = new Notification({
        senderId,
        receiverId,
        title: "Matrimonial",
        message: `${sender?.name} has sent you an interest`,
      });
      await notification.save();
  
      sendchatNotification(receiverId, {
        title: "Matrimonial",
        message: `${sender?.name} has sent you an interest`,
      });
  
      // Update the sender's sentInterests
      updatedSender = await User.findOneAndUpdate(
        { _id: senderId },
        { $addToSet: { sentInterests: receiverId } },
        { new: true } // Return the updated document
      );
  
      // Update the receiver's receivedInterests
      updatedReceiver = await User.findOneAndUpdate(
        { _id: receiverId },
        { $addToSet: { receivedInterests: senderId } },
        { new: true } // Return the updated document
      );
  
    } catch (error) {
      return next(error);
    }
  
    return res
      .status(200)
      .json({ message: "Interest sent successfully!", user: updatedSender });
  },
  

  /////..........................matchRequests..........................//

  async getPendingRequestsReceiver(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1; // Get the page number from the query parameter
      const requestsPerPage = 10;
      const receiverId = req.user._id;
      const totalRequests = await MatchRequest.countDocuments({
        receiverId,
        status: "pending",
      });
      const totalPages = Math.ceil(totalRequests / requestsPerPage); // Calculate the total number of pages

      const skip = (page - 1) * requestsPerPage; // Calculate the number of posts to skip based on the current page

      const requests = await MatchRequest.find({
        receiverId,
        status: "pending",
      })
        .skip(skip)
        .limit(requestsPerPage)
        .populate("senderId");
      let previousPage = page > 1 ? page - 1 : null;
      let nextPage = page < totalPages ? page + 1 : null;
      return res.status(200).json({
        requests: requests,
        auth: true,
        previousPage: previousPage,
        nextPage: nextPage,
      });
    } catch (error) {
      return next(error);
    }
  },

  async getPendingRequestsSender(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1; // Get the page number from the query parameter
      const requestsPerPage = 10;
      const senderId = req.user._id;
      const totalRequests = await MatchRequest.countDocuments({
        senderId,
        status: "pending",
      });
      const totalPages = Math.ceil(totalRequests / requestsPerPage); // Calculate the total number of pages

      const skip = (page - 1) * requestsPerPage; // Calculate the number of posts to skip based on the current page

      const requests = await MatchRequest.find({
        senderId,
        status: "pending",
      })
        .skip(skip)
        .limit(requestsPerPage)
        .populate("receiverId");
      let previousPage = page > 1 ? page - 1 : null;
      let nextPage = page < totalPages ? page + 1 : null;
      return res.status(200).json({
        requests: requests,
        auth: true,
        previousPage: previousPage,
        nextPage: nextPage,
      });
    } catch (error) {
      return next(error);
    }
  },

  async getMyRequests(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1; // Get the page number from the query parameter
      const requestsPerPage = 10;
      const senderId = req.user._id;
      const totalRequests = await MatchRequest.countDocuments({
        senderId,
        status: "pending",
      });
      const totalPages = Math.ceil(totalRequests / requestsPerPage); // Calculate the total number of pages

      const skip = (page - 1) * requestsPerPage; // Calculate the number of posts to skip based on the current page

      const requests = await MatchRequest.find({
        senderId,
        status: "pending",
      })
        .skip(skip)
        .limit(requestsPerPage)
        .populate("receiverId");
      let previousPage = page > 1 ? page - 1 : null;
      let nextPage = page < totalPages ? page + 1 : null;
      return res.status(200).json({
        requests: requests,
        auth: true,
        previousPage: previousPage,
        nextPage: nextPage,
      });
    } catch (error) {
      return next(error);
    }
  },

  async acceptRequest(req, res, next) {
    try {
      const requestId = req.query.requestId;
      const request = await MatchRequest.findById(requestId);
      const receiverId = req.user._id;
      if (!request) {
        const error = new Error("Request not found!");
        error.status = 404;
        return next(error);
      }
      if (request.status == "accept") {
        const error = new Error("Request already accepted!");
        error.status = 409;
        return next(error);
      }
      if (request.status == "reject") {
        const error = new Error("Request is rejected!");
        error.status = 409;
        return next(error);
      }
      request.status = "accept";
      await request.save();
      const requests = await MatchRequest.find({
        receiverId,
        status: "pending",
      });

      const acceptedRequest = new AcceptedRequest({
        senderId: request.senderId,

        receiverId: request.receiverId,
      });
      await acceptedRequest.save();

      //  update user

      await User.findByIdAndUpdate(
        receiverId,
        {
          $pull: { receivedInterests: request.senderId },
          $push: { friends: request.senderId },
        },
        { new: true }
      );

      await User.findByIdAndUpdate(
        request.senderId,
        {
          $pull: { sentInterests: receiverId },
          $push: { friends: receiverId },
        },
        { new: true }
      );

      await MatchRequest.findOneAndDelete({ _id: requestId });

      return res.status(200).json({
        auth: true,
        requests: requests,
      });
    } catch (error) {
      return next(error);
    }
  },

  async rejectRequest(req, res, next) {
    try {
      const requestId = req.query.requestId;
      const receiverId = req.user._id;
      const request = await MatchRequest.findById(requestId);
      if (!request) {
        const error = new Error("Request not found!");
        error.status = 404;
        return next(error);
      }
      await MatchRequest.findByIdAndDelete(requestId);
      const requests = await MatchRequest.find({
        receiverId,
        status: "pending",
      });

      return res.status(200).json({
        auth: true,
        requests: requests,
      });
    } catch (error) {
      return next(error);
    }
  },

  async getAcceptedRequests(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1; // Get the page number from the query parameter
      const requestsPerPage = 10;
      const myId = req.user._id;
      const totalRequests = await AcceptedRequest.countDocuments({
        $or: [{ receiverId: myId }, { senderId: myId }],
      });
      const totalPages = Math.ceil(totalRequests / requestsPerPage); // Calculate the total number of pages

      const skip = (page - 1) * requestsPerPage; // Calculate the number of posts to skip based on the current page

      const requests = await AcceptedRequest.find({
        $or: [{ receiverId: myId }, { senderId: myId }],
      })
        .skip(skip)
        .limit(requestsPerPage);

      await Promise.all(
        requests.map(async (request, index) => {
          const path = request.receiverId.equals(myId)
            ? "senderId"
            : "receiverId";
          let friend;
          if (path == "senderId") {
            friend = await User.findById(request.senderId);
          } else {
            friend = await User.findById(request.receiverId);
          }

          requests[index]._doc = { ...request._doc, friend: friend };
        })
      );

      let previousPage = page > 1 ? page - 1 : null;
      let nextPage = page < totalPages ? page + 1 : null;
      return res.status(200).json({
        requests: requests,
        auth: true,
        previousPage: previousPage,
        nextPage: nextPage,
      });
    } catch (error) {
      return next(error);
    }
  },

  // async getRejectedRequests(req, res, next) {
  //   try {
  //     const page = parseInt(req.query.page) || 1; // Get the page number from the query parameter
  //     const requestsPerPage = 10;
  //     const receiverId = req.user._id;
  //     const totalRequests = await MatchRequest.countDocuments({
  //       receiverId,
  //       status: "reject",
  //     });
  //     const totalPages = Math.ceil(totalRequests / requestsPerPage); // Calculate the total number of pages

  //     const skip = (page - 1) * requestsPerPage; // Calculate the number of posts to skip based on the current page

  //     const requests = await MatchRequest.find({
  //       receiverId,
  //       status: "reject",
  //     })
  //       .skip(skip)
  //       .limit(requestsPerPage)
  //       .populate("senderId");
  //     let previousPage = page > 1 ? page - 1 : null;
  //     let nextPage = page < totalPages ? page + 1 : null;
  //     return res.status(200).json({
  //       requests: requests,
  //       auth: true,
  //       previousPage: previousPage,
  //       nextPage: nextPage,
  //     });
  //   } catch (error) {
  //     return next(error);
  //   }
  // },
};

module.exports = userMatchController;
