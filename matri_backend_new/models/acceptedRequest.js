const mongoose = require("mongoose");

const { Schema } = mongoose;

const acceptedRequestSchema = Schema(
  {
    senderId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
    },
    receiverId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Accepted Request",
  acceptedRequestSchema,
  "accepted requests"
);
