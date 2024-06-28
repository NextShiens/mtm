const mongoose = require("mongoose");

const { Schema } = mongoose;

const matchRequestSchema = Schema(
  {
    senderId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
    },
    receiverId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
    },
    status: {
      type: String,
      enum: ["pending", "accept"],
      default: "pending"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Match Request",
  matchRequestSchema,
  "match requests"
);
