const express = require("express");
const app = express();
const User = require("../models/user");
const SuccessStory = require("../models/successStory");
const Subscription = require("../models/subscribtion.js");
const { defaultMaxListeners } = require("nodemailer/lib/xoauth2/index.js");
const cron = require("node-cron");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "admin"; // Use a strong secret key
// Schedule a job to run every hour

const maxAge = Date.now() + 24 * 3 * 60 * 60 * 1000;

cron.schedule("0 * * * *", async () => {
  try {
    const now = new Date();
    const result = await User.updateMany(
      { membershipExpiry: { $lte: now } },
      { $set: { membershipId: null } }
    );
    console.log(`Updated ${result.nModified} expired memberships.`);
  } catch (err) {
    console.error("Error updating expired memberships:", err);
  }
});

const dashboardController = {
  async adminLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    if (!user.isAdmin) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = jwt.sign({ id: user._id }, "ksdjfskdur");
    res
      .cookie("jwtToken", token, {
        httpOnly: true,
        expiresIn: maxAge,
        path: "/",
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({ message: "login", success: true, user, token });
  },

  async adminLogout(req, res) {
    res
      .cookie("jwtToken", "", {
        httpOnly: true,
        expiresIn: maxAge * 0,
      })
      .status(200)
      .json({ message: "logout", success: true });
  },

  async dashDetails(req, res) {
    try {
      const totalUsers = await User.countDocuments();
      const activeUsers = await User.countDocuments({ isActive: true });
      const paidUsers = await User.countDocuments({ isPaid: true });
      const featuredUsers = await User.countDocuments({ isFeatured: true });

      const currentDate = new Date();
      // Set the time to the beginning of the day
      currentDate.setHours(0, 0, 0, 0);

      // Calculate 30 days before date
      const thirtyDaysBeforeDate = new Date(currentDate);
      thirtyDaysBeforeDate.setDate(currentDate.getDate() - 30);

      // Set the time to the beginning of the day
      thirtyDaysBeforeDate.setHours(0, 0, 0, 0);

      const lastThirtyDaysUserCount = await User.countDocuments({
        createdAt: { $gte: thirtyDaysBeforeDate },
      });

      const beforeThirtyDaysUserCount = await User.countDocuments({
        createdAt: { $lt: thirtyDaysBeforeDate },
      });

      const lastThirtyDaysActiveUserCount = await User.countDocuments({
        createdAt: { $gte: thirtyDaysBeforeDate },
        isActive: true,
      });

      const beforeThirtyDaysActiveUserCount = await User.countDocuments({
        createdAt: { $lt: thirtyDaysBeforeDate },
        isActive: true,
      });

      const lastThirtyDaysPaidUserCount = await User.countDocuments({
        createdAt: { $gte: thirtyDaysBeforeDate },
        isPaid: true,
      });

      const beforeThirtyDaysPaidUserCount = await User.countDocuments({
        createdAt: { $lt: thirtyDaysBeforeDate },
        isPaid: true,
      });

      const lastThirtyDaysFeaturedUserCount = await User.countDocuments({
        createdAt: { $gte: thirtyDaysBeforeDate },
        isPaid: true,
      });

      const beforeThirtyDaysFeaturedUserCount = await User.countDocuments({
        createdAt: { $lt: thirtyDaysBeforeDate },
        isPaid: true,
      });

      let userPercentageChange;
      if (beforeThirtyDaysUserCount === 0) {
        userPercentageChange = lastThirtyDaysUserCount * 100; // If last week's orders are zero, the change is undefined
      } else {
        userPercentageChange = (
          ((lastThirtyDaysUserCount - beforeThirtyDaysUserCount) /
            beforeThirtyDaysUserCount) *
          100
        ).toFixed(2);
      }

      if (userPercentageChange > 0) {
        userPercentageChange = "+" + userPercentageChange + "%";
      } else {
        userPercentageChange = userPercentageChange + "%";
      }

      let activeUserPercentageChange;
      if (beforeThirtyDaysActiveUserCount === 0) {
        activeUserPercentageChange = lastThirtyDaysActiveUserCount * 100; // If last week's orders are zero, the change is undefined
      } else {
        activeUserPercentageChange = (
          ((lastThirtyDaysActiveUserCount - beforeThirtyDaysActiveUserCount) /
            beforeThirtyDaysActiveUserCount) *
          100
        ).toFixed(2);
      }

      if (activeUserPercentageChange > 0) {
        activeUserPercentageChange = "+" + activeUserPercentageChange + "%";
      } else {
        activeUserPercentageChange = activeUserPercentageChange + "%";
      }

      let paidUserPercentageChange;
      if (beforeThirtyDaysPaidUserCount === 0) {
        paidUserPercentageChange = lastThirtyDaysPaidUserCount * 100; // If last week's orders are zero, the change is undefined
      } else {
        paidUserPercentageChange = (
          ((lastThirtyDaysPaidUserCount - beforeThirtyDaysPaidUserCount) /
            beforeThirtyDaysPaidUserCount) *
          100
        ).toFixed(2);
      }

      if (paidUserPercentageChange > 0) {
        paidUserPercentageChange = "+" + paidUserPercentageChange + "%";
      } else {
        paidUserPercentageChange = paidUserPercentageChange + "%";
      }

      let featuredUserPercentageChange;
      if (beforeThirtyDaysFeaturedUserCount === 0) {
        featuredUserPercentageChange = lastThirtyDaysFeaturedUserCount * 100; // If last week's orders are zero, the change is undefined
      } else {
        featuredUserPercentageChange = (
          ((lastThirtyDaysFeaturedUserCount -
            beforeThirtyDaysFeaturedUserCount) /
            beforeThirtyDaysFeaturedUserCount) *
          100
        ).toFixed(2);
      }

      if (featuredUserPercentageChange > 0) {
        featuredUserPercentageChange = "+" + featuredUserPercentageChange + "%";
      } else {
        featuredUserPercentageChange = featuredUserPercentageChange + "%";
      }

      return res.json({
        totalUsers: totalUsers,
        userPercentageChange: userPercentageChange,
        activeUsers: activeUsers,
        activeUserPercentageChange: activeUserPercentageChange,
        paidUsers: paidUsers,
        paidUserPercentageChange: paidUserPercentageChange,
        featuredUsers: featuredUsers,
        featuredUserPercentageChange: featuredUserPercentageChange,
      });
    } catch (error) {
      return next(error);
    }
  },

  async getAllUsers(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1; // Get the page number from the query parameter
      const usersPerPage = 10;
      const totalUsers = await User.countDocuments(); // Get the total number of posts for the user
      const totalPages = Math.ceil(totalUsers / usersPerPage); // Calculate the total number of pages

      const skip = (page - 1) * usersPerPage; // Calculate the number of posts to skip based on the current page

      const users = await User.find().skip(skip).limit(usersPerPage);
      let previousPage = page > 1 ? page - 1 : null;
      let nextPage = page < totalPages ? page + 1 : null;
      return res.status(200).json({
        users: users,
        auth: true,
        previousPage: previousPage,
        nextPage: nextPage,
        totalPages: totalPages,
      });
    } catch (error) {
      return next(error);
    }
  },

  async addSubscriptionPlan(req, res, next) {
    try {
      const { name, price, duration, messages, liveChat, profileViews } =
        req.body;

      const ifPlanAlreadyExists = await Subscription.findOne({ name });
      if (ifPlanAlreadyExists) {
        throw new Error("Plan already exists");
      }

      const subscription = new Subscription({
        name,
        price,
        duration,
        messages,

        liveChats: liveChat.toUpperCase(),
        profileViews,
      });
      await subscription.save();
      return res.status(200).json({
        subscription: subscription,
        auth: true,
        success: true,
        message: "Subscription plan created successfully",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
      return next(error);
    }
  },

  async getSubscriptionPlan(req, res, next) {
    try {
      const subscription = await Subscription.find();
      return res.status(200).json({
        subscription: subscription,
        auth: true,
        success: true,
        message: "Subscription plan fetched successfully",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
      return next(error);
    }
  },

  async deleteSubscriptionPlan(req, res, next) {
    try {
      const { id } = req.params;
      await Subscription.findByIdAndDelete(id);
      const subscriptions = await Subscription.find();
      return res.status(200).json({
        subscriptions: subscriptions,
        auth: true,
        success: true,
        message: "Subscription plan deleted successfully",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
      return next(error);
    }
  },

  async getSubscriptionPlanById(req, res, next) {
    try {
      const { id } = req.params;
      const subscription = await Subscription.findById(id);
      return res.status(200).json({
        subscription: subscription,
        auth: true,
        success: true,
        message: "Subscription plan fetched successfully",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
      return next(error);
    }
  },

  async updateSubscriptionPlan(req, res, next) {
    try {
      const { id } = req.params;
      const {
        name,
        price,
        duration,
        messages,
        sms,
        contactViews,
        liveChat,
        profileViews,
      } = req.body;
      const subscription = await Subscription.findByIdAndUpdate(
        id,
        {
          name,
          price,
          duration,
          messages,
          sms,
          contactViews,
          liveChats: liveChat.toUpperCase(),
          profileViews,
        },
        {
          new: true,
        }
      );
      return res.status(200).json({
        subscription: subscription,
        auth: true,
        success: true,
        message: "Subscription plan updated successfully",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
      return next(error);
    }
  },

  async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findById(id).populate({
        path: "membership",
        select:
          "name price duration messages sms contactViews liveChats profileViews",
      });
      return res.status(200).json({
        user: user,
        auth: true,
        success: true,
        message: "User fetched successfully",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
      return next(error);
    }
  },

  async updateUserMembership(req, res, next) {
    try {
      const { id } = req.params;
      const { membershipId } = req.body;

      const membershipPlan = await Subscription.findById(membershipId);
      const ExpiryInNumber = membershipPlan.duration.match(/\d+/)[0]; // Extracts the number part

      const user = await User.findByIdAndUpdate(
        id,
        {
          membership: membershipId,
          isPaid: true,
          membershipExpiry:
            Date.now() + ExpiryInNumber * 30 * 24 * 60 * 60 * 1000,
        },
        { new: true }
      ).populate({
        path: "membership",
        select:
          "name price duration messages sms contactViews liveChats profileViews",
      });

      return res.status(200).json({
        user: user,
        auth: true,
        success: true,
        message: "User membership updated successfully",
      });

      return res.status(200).json({
        user: user,
        auth: true,
        success: true,
        message: "User membership updated successfully",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
      return next(error);
    }
  },

  async updateActiveStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { activeStatus } = req.body;

      const user = await User.findByIdAndUpdate(
        id,
        { isActive: activeStatus },
        { new: true }
      ).populate({
        path: "membership",
        select:
          "name price duration messages sms contactViews liveChats profileViews",
      });

      return res.status(200).json({
        user: user,
        auth: true,
        success: true,
        message: "User Status updated successfully",
      });

      return res.status(200).json({
        user: user,
        auth: true,
        success: true,
        message: "User membership updated successfully",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
      return next(error);
    }
  },

  async updateFeaturedStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { isFeatured } = req.body;

      const user = await User.findByIdAndUpdate(
        id,
        { isFeatured },
        { new: true }
      ).populate({
        path: "membership",
        select:
          "name price duration messages sms contactViews liveChats profileViews",
      });

      return res.status(200).json({
        user: user,
        auth: true,
        success: true,
        message: "User Status updated successfully",
      });

      return res.status(200).json({
        user: user,
        auth: true,
        success: true,
        message: "User membership updated successfully",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
      return next(error);
    }
  },
  async createUser(req, res) {
    try {
      const {
        name,
        email,
        phone,
        password,
        isAdmin,
        gender,
        dateOfBirth,
        age,
        height,
        motherTongue,
        cast,
        religion,
        sect,
        city,
        highestDegree,
        occupation,
        employedIn,
        annualIncome,
        workLocation,
        maritalStatus,
        fcmToken,
        userImages,
        ageFrom,
        ageTo,
        heightFrom,
        heightTo,
        lookingFor,
        physicalStatus,
        food,
        smoking,
        drinking,
        familyType,
        familyStatus,
        familyValue,
        fathersOccupation,
        horoscopeDetails,
        FamilyDetails,
        Education,
        partnerExpectation
      } = req.body;

      // Validate required fields
      if (!name || !email || !phone || !password) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
      }

      // Check if user with this email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: "User with this email already exists" });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      const newUser = new User({
        name,
        email,
        phone,
        password: hashedPassword,
        isAdmin: isAdmin || false,
        gender,
        dateOfBirth,
        age,
        height,
        motherTongue,
        cast,
        religion,
        sect,
        city,
        highestDegree,
        occupation,
        employedIn,
        annualIncome,
        workLocation,
        maritalStatus,
        fcmToken,
        userImages: userImages || [],
        ageFrom,
        ageTo,
        heightFrom,
        heightTo,
        lookingFor,
        physicalStatus,
        food,
        smoking,
        drinking,
        familyType,
        familyStatus,
        familyValue,
        fathersOccupation,
        horoscopeDetails,
        FamilyDetails,
        Education,
        partnerExpectation
      });

      await newUser.save();

      res.status(201).json({ success: true, message: "User created successfully", user: newUser });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ success: false, message: "Error creating user", error: error.message });
    }
  },

  async editUser(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Remove password from updateData if it exists (password should be updated separately)
      delete updateData.password;

      const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

      if (!updatedUser) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      res.status(200).json({ success: true, message: "User updated successfully", user: updatedUser });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ success: false, message: "Error updating user", error: error.message });
    }
  },
  async getUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      res.status(200).json({ success: true, user });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ success: false, message: "Error fetching user", error: error.message });
    }
  },


  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      await User.findByIdAndDelete(id);
      const users = await User.find();
      return res.status(200).json({
        auth: true,
        users: users,
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
      return next(error);
    }
  },

  async getUserInfo(req, res, next) {
    const user = req.user;
    if (user) {
      res.status(200).json({ success: true, user });
    } else {
      res.status(400).json({ success: false });
    }
  },
  async addSuccessStory(req, res) {
    try {
      const { title, description, image } = req.body;
      const createdBy = req.user._id; // Assuming you have authentication middleware

      if (!title || !description || !image) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
      }

      const newSuccessStory = new SuccessStory({
        title,
        description,
        image,
        createdBy,
      });

      await newSuccessStory.save();

      res.status(201).json({ success: true, message: "Success story added successfully", successStory: newSuccessStory });
    } catch (error) {
      console.error("Error adding success story:", error);
      res.status(500).json({ success: false, message: "Error adding success story", error: error.message });
    }
  },

  async getSuccessStories(req, res) {
    try {
      const successStories = await SuccessStory.find().sort({ createdAt: -1 });
      res.status(200).json({ success: true, successStories });
    } catch (error) {
      console.error("Error fetching success stories:", error);
      res.status(500).json({ success: false, message: "Error fetching success stories", error: error.message });
    }
  },
  async deleteSuccessStory(req, res) {
    try {
      const { id } = req.params;
      const deletedStory = await SuccessStory.findByIdAndDelete(id);

      if (!deletedStory) {
        return res.status(404).json({ success: false, message: "Success story not found" });
      }

      res.status(200).json({ success: true, message: "Success story deleted successfully" });
    } catch (error) {
      console.error("Error deleting success story:", error);
      res.status(500).json({ success: false, message: "Error deleting success story", error: error.message });
    }
  },
};

module.exports = dashboardController;
