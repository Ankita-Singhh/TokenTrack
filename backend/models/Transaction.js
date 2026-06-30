const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CouponItem",
      required: true,
    },

    itemName: {
      type: String,
      required: true,
    },

    mess: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mess",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },

    processedBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},

status: {
  type: String,
  enum: ["completed", "reversed"],
  default: "completed",
},

reversedAt: {
  type: Date,
  default: null,
},

reversedBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  default: null,
},

    purchasedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

transactionSchema.index({
  student: 1,
  purchasedAt: -1,
});

module.exports = mongoose.model(
  "Transaction",
  transactionSchema
);