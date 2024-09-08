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
  const key = 'rzp_live_87MOwe1ckbeY0F';
  res.status(200).json({ keyId: key });
});
module.exports = router;
