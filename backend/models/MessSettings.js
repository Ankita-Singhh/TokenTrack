const mongoose = require("mongoose");

const messSettingsSchema = new mongoose.Schema(
  {
    mess: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mess",
      required: true,
      unique: true,
    },

    couponsPerSemester: {
      type: Number,
      required: true,
    },

    couponValue: {
      type: Number,
      required: true,
    },

    // When balance becomes less than or equal to this value,
    // the student receives a low balance notification.
    lowBalanceThreshold: {
      type: Number,
      default: 10,
      min: 1,
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

module.exports = mongoose.model(
  "MessSettings",
  messSettingsSchema
);