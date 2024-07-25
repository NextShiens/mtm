require("dotenv").config();
const express = require("express");
const {
  createOrder,
  verifyPayment,
} = require("../controller/paymnetController");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.post("/create-order", auth, createOrder);

router.post("/verify-payment", auth, verifyPayment);

router.get("/get-keyid", auth, (req, res) => {
  const key = process.env.RAZORPAY_KEY_ID || "rzp_test_FIno2mP3rGvz9W";
  res.status(200).json({ keyId: key });
});
module.exports = router;
