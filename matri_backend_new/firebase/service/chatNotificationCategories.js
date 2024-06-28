const User = require("../../models/user.js");

const {
  TEXT_MESSAGE,
  QUATATION,
  IMAGES,
  DOCUMENTS,
} = require("../Notifications/chatNotificationTypes");

const chatnotificationsCategories = {
  [TEXT_MESSAGE]: {
    type: "%Name%",
    template: "%messagedata%",
    path: "/chatDetailScreen",
  },
  [IMAGES]: {
    type: "%Name%",
    template: "sent a Image!",
    path: "/chatDetailScreen",
  },
  [DOCUMENTS]: {
    type: "%Name%",
    template: "sent a document!",
    path: "/chatDetailScreen",
  },
  [QUATATION]: {
    type: "%Name%",
    template: "sent a quotation!",
    path: "/chatDetailScreen",
  },
};

async function getFcmTokenForChat(userId) {
  try {
    const gettingDeviceToken = await User.findById({ _id: userId });
    let deviceToken = gettingDeviceToken.fcmToken;
    if (deviceToken) {
      return deviceToken;
    } else {
      console.log("users device token does not exist");
    }
  } catch (err) {
    console.log("error retreiving FCM token:", err);
    throw err;
  }
}

module.exports = { chatnotificationsCategories, getFcmTokenForChat };
