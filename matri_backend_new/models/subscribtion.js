const mongoose = require("mongoose");

const { Schema } = mongoose;

const subscriptionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    messages: {
      type: Number,
      required: true,
    },
    sms: {
      type: Number,
      required: true,
    },
    contactViews: {
      type: Number,
      required: true,
    },
    liveChats: {
      type: String,
      default: "NO",
    },
    profileViews: {
      type: Number,
      default: 0,
    },
    // expiresAt: {
    //   type: Date,
    //   index: { expires: 0 }, // TTL index, the document expires at the date specified in this field
    // },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Subscription",
  subscriptionSchema,
  "subscriptions"
);
