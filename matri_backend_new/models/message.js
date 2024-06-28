const mongoose = require("mongoose");

const { Schema } = mongoose;

const messageSchema = Schema(
  {
    roomId: String,
    authorName: String,
    authorId: String,
    receiverId: String,
    text: String,
    createdAt: {
      type: Date,
      default: new Date(),
    },
    // message: [
    //   {
    //     _id: String,
    //     text: String,
    //     createdAt: Date,
    //     user: {
    //       _id: String,
    //     },
    //   },
    // ],
  },

  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema, "message");
