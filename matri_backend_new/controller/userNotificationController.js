const express = require("express");
const app = express();
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const User = require("../models/user.js");
const Notification = require("../models/notification.js");
const MatchRequest = require("../models/matchRequest.js");
const JWTService = require("../services/JWTService.js");
const RefreshToken = require("../models/token.js");
const AccessToken = require("../models/accessToken.js");
const { sendchatNotification } = require("../firebase/service/index.js");

const userMatchController = {
  //.......................................userMatch..................................//

  async getNotifications(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1; // Get the page number from the query parameter
      const notificationsPerPage = 10;
      const receiverId = req.user._id;
      const totalNotifications = await Notification.find({ receiverId });
      const totalPages = Math.ceil(totalNotifications / notificationsPerPage); // Calculate the total number of pages

      const skip = (page - 1) * notificationsPerPage; // Calculate the number of posts to skip based on the current page

      const notifications = await Notification.find({ receiverId })
        .skip(skip)
        .limit(notificationsPerPage)
        .populate("senderId");
      let previousPage = page > 1 ? page - 1 : null;
      let nextPage = page < totalPages ? page + 1 : null;
      return res.status(200).json({
        notifications: notifications,
        auth: true,
        previousPage: previousPage,
        nextPage: nextPage,
      });
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = userMatchController;
