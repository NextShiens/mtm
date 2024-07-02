const express = require("express");
const userAuthController = require("../controller/userAuthController");
const userMatchController = require("../controller/userMatchController");
const userNotificationController = require("../controller/userNotificationController");
// const ambulanceCrudController = require("../controller/Ambulance/ambulanceCrudController");
// const ambulanceDashController = require("../controller/Ambulance/ambulanceDashController");
// const ambulanceRequestController = require("../controller/Ambulance/ambulanceRequestController");
const VerificationController = require("../controller/verificationController");
const { auth } = require("../middlewares/auth");
const uploadFileController = require("../controller/uploadFileController");
const multer = require("multer");
const chatController = require("../controller/chatController");
const router = express.Router();
// const upload = multer({ dest: "/temp" });

const storage = multer.diskStorage({
  destination: "./temp", // Update the destination path
});

const upload = multer({ storage: storage });

//..............auth...............
router.post("/user/register", userAuthController.register);
router.post("/user/login", userAuthController.login);
router.post("/user/changePassword", userAuthController.changePassword);
router.post("/user/forgotPassword", userAuthController.forgotPassword);
router.post("/user/deleteAccount", userAuthController.deleteAccount);
router.post("/user/socialLogin", userAuthController.socialLogin);
router.post(
  "/user/uploadFile",
  upload.single("file"),
  uploadFileController.uploadFile
);

// router.post("/user/completeSignup", userAuthController.completeSignup);
router.put("/user/completeProfile",auth, userAuthController.completeProfile);
router.put("/user/updateProfile", auth, userAuthController.updateProfile);
router.put(
  "/user/updateActiveStatus",
  auth,
  userAuthController.updateActiveStatus
);
router.post("/user/logout", auth, userAuthController.logout);
// router.post("/user/refresh", auth, ambulanceAuthController.refresh);

//..............verification.....................//
router.post("/user/sendCodeToEmail", VerificationController.sendCodeToEmail);
router.post("/user/confirmEmail", VerificationController.confirmEmail);
router.post("/user/verifyEmail", VerificationController.verifyEmail);

// router.post("/ambulance/ResetLink", VerificationController.ResetLink);
// router.post("/ambulance/resetPassword", VerificationController.resetPassword);

//....................recentlyViewed...................//
router.post("/user/recentlyViewed", auth, userMatchController.recentlyViewed);
router.get("/user/getRecentViewed", auth, userMatchController.getRecentViewed);

//................match user....................
router.get("/user/userMatch",auth,  userMatchController.userMatch);
router.get("/user/newUsers", auth, userMatchController.newUsers);

router.get(
  "/user/getPendingRequestsReceiver",
  auth,
  userMatchController.getPendingRequestsReceiver
);
router.get(
  "/user/getPendingRequestsSender",
  auth,
  userMatchController.getPendingRequestsSender
);
router.post("/user/acceptRequest", auth, userMatchController.acceptRequest);
router.post("/user/rejectRequest", auth, userMatchController.rejectRequest);
router.get(
  "/user/getAcceptedRequests",
  auth,
  userMatchController.getAcceptedRequests
);
router.post("/user/getMyRequests", auth, userMatchController.getMyRequests);

//................notifications.............................//
router.get(
  "/user/getNotifications",
  auth,
  userNotificationController.getNotifications
);

//................................Interests..................................//

router.post("/user/sendInterest", auth, userMatchController.sendInterest);
router .post("/user/saveUser", auth, userMatchController.saveUser);
router.get("/user/getSavedUsers", auth, userMatchController.getSavedUsers);

//................................Chat..................................//
//
router.get(
  "/user/getAllConversation",
  auth,
  chatController.getAllConversations
);
router.get("/user/getMessages", chatController.getMessages);

// search user with name ,email,occupation,maritalStatus,gender
router.post("/user/searchUser", auth, userAuthController.searchUser);

// ---------------------subscription----------------------
router.get("/user/getSubscription", userAuthController.getSubscriptions);

// ---------------------user details----------------------
router.get("/user/userDetails/:id", auth, userAuthController.userDetails);

// get perefrences for a user that what other user prefer
router.post("/user/userPreferences/", auth, userAuthController.userPreferences);

router.get("/user/profile", auth, userAuthController.userProfile);

router.get('/user/current-user', auth, userAuthController.currentUser)
module.exports = router;
