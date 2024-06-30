require("dotenv").config();
const Razorpay = require("razorpay");
const mongoose = require('mongoose');
const User = require("../models/user");
const Order = require("../models/order");

const razorpay = new Razorpay({
  key_id: 'rzp_test_FIno2mP3rGvz9W',
  key_secret: 'ZAl5MyuBueiB8wxzA2dIpsXb',
});
console.log(process.env.RAZORPAY_KEY_ID, "key_id")
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
    membership,
    amount,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(membership)) {
    return res.status(400).json({ success: false, message: 'Invalid userId or membership' });
  }

  try {
    // Create order record in database
    const newOrder = await Order.create({
      membership: mongoose.Types.ObjectId(membership),
      userId: mongoose.Types.ObjectId(userId),
      orderId: razorpay_order_id,
      amount,
    });

    // Update user membership and order history
    const updatedUser = await User.findByIdAndUpdate(userId, {
      membership: mongoose.Types.ObjectId(membership),
      isPaid: true,
      $push: { orders: newOrder._id },
    }, { new: true }); // Ensure to get the updated document back

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    console.log("updatedUser", updatedUser)
    return res.status(200).json({ success: true, newOrder });
    console.log("updatedUser", updatedUser)
  } catch (error) {
    console.error('Error updating user membership:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
module.exports = { createOrder, verifyPayment };