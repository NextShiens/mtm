const admin = require('firebase-admin');
const { chatTemplatePlaceholder } = require("../utils/metaDataReplacer");
const {
  chatnotificationsCategories,
  getFcmTokenForChat,
} = require("./chatNotificationCategories");

// Check if the app is already initialized
if (!admin.apps.length) {
  const serviceAccount = require('../../vaishakhi-matrimony-firebase-adminsdk-mjr6h-33d857fb90.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket:"gs://vaishakhi-matrimony.appspot.com"
    // If you're using other Firebase services, include their configs here
  });
}

async function sendchatNotification(userId, messageData, senderId) {
  try {
    console.log("Sending notification to user:", userId);
    let userToken = await getFcmTokenForChat(userId);
    console.log("Retrieved FCM token:", userToken);

    if (!userToken) {
      console.log("No valid FCM token found for user:", userId);
      return;
    }

    let message = {
      token: userToken,
      notification: {
        title: messageData.title || "Matrimonial",
        body: messageData?.message,
      },
      data: {
        senderId: senderId.toString(),
      },
    };
    console.log("Constructed message object:", JSON.stringify(message, null, 2));

    const response = await admin.messaging().send(message);
    console.log("Firebase notification sent successfully!", response);
  } catch (err) {
    console.error("Error sending notification:", err);
    if (err.code === "messaging/mismatched-credential") {
      console.error("SenderId mismatch. Please check your Firebase configuration and FCM token.");
      console.error("Error details:", JSON.stringify(err, null, 2));
    }
  }
}

module.exports = { sendchatNotification };