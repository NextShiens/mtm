const mongoose = require("mongoose");

const { Schema } = mongoose;

const verificationCodeSchema = new Schema(
  {
    email: { type: String, required: true },
    code: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 150,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "VerificationCode",
  verificationCodeSchema,
  "verificationCodes"
);
