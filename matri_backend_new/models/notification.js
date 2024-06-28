const mongoose = require("mongoose");

const { Schema } = mongoose;

const notificatioSchema = Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    title: {
      type: String,
    },
    message: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 7 * 24 * 60 * 60,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Notification",
  notificatioSchema,
  "notifications"
);
