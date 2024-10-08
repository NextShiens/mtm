const Conversation = require("../models/conversation");
const User = require("../models/user");
const Message = require("../models/message");
const message = require("../models/message");
const Notification = require("../models/notification");


const checkRoom = async (data) => {
  const conversation = await Conversation.findOne({ roomId: data.roomId });

  if (!conversation) {
    try {
      const conversationToSave = new Conversation({
        roomId: data.roomId,
        members: [data.user._id, data.receiverId],
      });

      await conversationToSave.save();

      const user = await User.findById(data.user._id);
      let newObject = {
        roomId: data.roomId,
        chatedId: data.receiverId,
      };
      if (user) {
        await User.updateOne(
          { _id: data.authorId },
          { $push: { chatedUsers: newObject } }
        );
      } else {
        console.log("User not found.");
      }
    } catch (error) {
      console.log("save conversation error........", error);
    }
  }
};

const saveMessage = async (data) => {
  const messageToSave = new Message({
    roomId: data.roomId,
    authorName: data.author,
    authorId: data.authorId,
    receiverId: data.receiverId,
    text: data.text,
    createdAt: new Date(),
  });
  console.log("saved data...", messageToSave);
  await messageToSave.save();
};
const saveNotification = async (data) => {
  console.log("data in notification....", data);
  const notification = new Notification({
    senderId: data.roomId.split("_")[1],
    receiverId: data.receiverId,
    title: "Chat",
    message: data.text,
    createdAt: new Date(),
  });

  await notification.save();
}

module.exports = { checkRoom, saveMessage, saveNotification };
