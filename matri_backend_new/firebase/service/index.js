const { firebase } = require("../");
const { chatTemplatePlaceholder } = require("../utils/metaDataReplacer");
const {
  chatnotificationsCategories,
  getFcmTokenForChat,
} = require("./chatNotificationCategories");

async function sendchatNotification(
  userId,
  messageData
  //   chatnotificationCategory
  //   channelId,
  //   senderId
) {
  //   const { type, template, path } =
  //     chatnotificationsCategories[chatnotificationCategory];
  let userToken = await getFcmTokenForChat(userId);

  //   let userToken =
  // "fqHcHn3QTL-cuwjwd6PMz2:APA91bGZ78UsczXQGcRyxvt0d9IgiPxAYt4mE9XVtugqnZIaE-CPXzBZDJ80nV2QnnPUGlQe3Ai_i-MP4WJeVwRSipAm8ZbQ2p4IdBP5Wr3a7N4fBC0Ble7aS4QYtU023oRxV-0xcKPu";

  //   const [chatTemplateData, userType] = await Promise.all([
  //     chatTemplatePlaceholder(type, template, messageData, senderId),
  //     getchatsUserType(userId),
  //   ]);
  let message = {
    token: userToken.toString(),
    notification: {
      //   title: chatTemplateData[0],
      //   body: chatTemplateData[1],
      title: messageData.title ? messageData.title : "Matrimonial",
      body: messageData?.message,
    },
  };

  try {
    const response = await firebase.messaging().send(message);
    // info("firebase notification sent successfully!", response);
    console.log("firebase notification sent successfully!", response);
  } catch (err) {
    console.log("error sending notification!", err);
  }
}

module.exports = { sendchatNotification };
