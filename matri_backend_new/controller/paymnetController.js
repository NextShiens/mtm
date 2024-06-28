require("dotenv").config();
const Razorpay = require("razorpay");
const User = require("../models/user");
const Order = require("../models/order");

const razorpay = new Razorpay({
  key_id: 'rzp_test_FIno2mP3rGvz9W',
  key_secret: 'ZAl5MyuBueiB8wxzA2dIpsXb',
});
console.log(process.env.RAZORPAY_KEY_ID, "key_id")
// Create order endpoint
const createOrder = async (req, res) => {
  const { amount } = req.body;
  console.log(amount, "amount")
  const options = {
    amount: amount, // amount in the smallest currency unit
    currency: "INR",
    receipt: `receipt_${Math.random() * 10}`,
  };

  // Create an order in razorpay

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.log(error, "error")
    res.status(500).json({ error: error.message });
  }
};

// Payment verification endpoint
const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    userId,
    memberShipId,
    amount,
  } = req.body;
  const crypto = require("crypto");
  const hash = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (hash === razorpay_signature) {
    // craete order record in database
    const newOrder = await Order.create({
      memberShipId,
      userId,
      orderId: razorpay_order_id,
      amount,
    });

    // update user membeship and order history
    await User.findByIdAndUpdate(userId, {
      membership: memberShipId,
      isPaid: true,
      $push: { orders: newOrder._id },
    });
    res.status(200).json({ success: true, newOrder });
  } else {
    res.status(500).json({ success: false });
  }
};

module.exports = { createOrder, verifyPayment };