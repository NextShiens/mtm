const express = require("express");
const app = express();

const Conversation = require("../models/conversation");
const User = require("../models/user");
const Message = require("../models/message");

const { ObjectId } = require("mongodb");
const conversation = require("../models/conversation");

const chatController = {
  async getAllConversations(req, res, next) {
    const loggedInUserId = req.user._id;
    const normalId = new ObjectId(loggedInUserId).toString();

    const query = { members: { $elemMatch: { $in: [loggedInUserId] } } };

    Conversation.find(query).exec((err, conversations) => {
      if (err) {
        console.error("Error executing query:", err);
        return;
      }

      const chattedUserPromises = conversations.map((conversation) => {
        const chattedUserId = conversation.members.find(
          (member) => member !== normalId
        );
        return User.findOne({ _id: chattedUserId });
      });

      Promise.all(chattedUserPromises)
        .then((chattedUsers) => {
          const conversationsWithChattedUser = conversations.map(
            (conversation, index) => {
              return {
                ...conversation,
                chattedUser: chattedUsers[index],
              };
            }
          );
          // console.log(
          //   "Conversations with Chatted User:",
          //   conversationsWithChattedUser
          // );

          if (!conversationsWithChattedUser) {
            return res.status(404).json({ error: "Conversation not found" });
          }
          // res.json({ success: true, chats: conversationsWithChattedUser });
          return res.status(200).json({
            success: true,
            chats: conversationsWithChattedUser,
          });
        })
        .catch((error) => {
          console.error("Error fetching chatted user details:", error);
          return res.status(404).json({ error: error.message });
        });
    });
  },

async getMessages(req, res, next) {
    const roomId = req.query.roomId;

    try {
      const messages = await Message.find({ roomId }).exec();
      console.log("Fetched messages:", messages); 

      let responseArray = [];
      // messages.map((message) => {
      //   responseArray.push({
      //     user: message.message[0].user,
      //     _id: message.message[0]._id,
      //     text: message.message[0].text,
      //     createdAt: message.message[0].createdAt,
      //   });
      // });
      // console.log("message....", responseArray);

      return res.status(200).json({
        success: true,
        messages,
      });

      // return conversations;
    } catch (error) {
      console.error("Error fetching conversations:", error.message);
      return res.status(404).json({ error: error.message });
    }
  },
};

module.exports = chatController;
