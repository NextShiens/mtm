const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = Schema(
  {
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: "user" },
    membership: { type: mongoose.SchemaTypes.ObjectId, ref: "membership" },
    orderId: String,
    amount: Number,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema, "orders");
