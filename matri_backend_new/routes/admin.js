const express = require("express");
const router = express.Router();
const adminDashController = require("../controller/dashboardController");
const { isAuthenticated } = require("../middlewares/auth");

//..............dashboard...............
router.get(
  "/admin/getAllUsers",
  isAuthenticated,
  adminDashController.getAllUsers
);
router.get(
  "/admin/dashDetails",
  isAuthenticated,
  adminDashController.dashDetails
);

router.post(
  "/admin/add-sub-plan",
  isAuthenticated,
  adminDashController.addSubscriptionPlan
);
router.get(
  "/admin/get-sub-plan",
  isAuthenticated,
  adminDashController.getSubscriptionPlan
);
router.delete(
  "/admin/deletePlan/:id",
  isAuthenticated,
  adminDashController.deleteSubscriptionPlan
);
router.put(
  "/admin/updatePlan/:id",
  isAuthenticated,
  adminDashController.updateSubscriptionPlan
);
router.get(
  "/admin/plan/:id",
  isAuthenticated,
  adminDashController.getSubscriptionPlanById
);
router.get("/admin/user/:id", isAuthenticated, adminDashController.getUserById);
router.put(
  "/admin/update-user/:id",
  isAuthenticated,
  adminDashController.updateUserMembership
);
router.put(
  "/admin/update-featured/:id",
  isAuthenticated,
  adminDashController.updateFeaturedStatus
);
router.put(
  "/admin/update-userActive/:id",
  isAuthenticated,
  adminDashController.updateActiveStatus
);
router.delete(
  "/admin/delete-user/:id",
  isAuthenticated,
  adminDashController.deleteUser
);

// admin auth
router.post("/admin/login", adminDashController.adminLogin);
router.get(
  "/admin/checkLogin",
  isAuthenticated,
  adminDashController.getUserInfo
);

router.get("/admin/logout", isAuthenticated, adminDashController.adminLogout);

router.get(
  "/admin/getUserInfo",
  isAuthenticated,
  adminDashController.getUserInfo
);
router.post("/admin/create-user",isAuthenticated, adminDashController.createUser);
router.put("/admin/edit-user/:id",isAuthenticated, adminDashController.editUser);
module.exports = router;
