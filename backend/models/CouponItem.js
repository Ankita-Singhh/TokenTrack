const mongoose = require("mongoose");

const couponItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 1,
    },

    mess: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mess",
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

couponItemSchema.index(
  {
    mess: 1,
    name: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model(
  "CouponItem",
  couponItemSchema
);