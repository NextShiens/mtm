const mongoose = require("mongoose");

const { Schema } = mongoose;

const conversationSchema = Schema(
  {
    roomId: String,
    members: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Conversations",
  conversationSchema,
  "conversations"
);
