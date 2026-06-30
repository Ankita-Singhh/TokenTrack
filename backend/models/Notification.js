const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    mess: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mess",
      default: null,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: [
        "notice",
        "low_balance",
        "approval",
        "recharge",
        "general",
      ],
      default: "general",
    },

    action: {
  type: String,
  enum: ["created", "updated", "deleted"],
  default: "created",
},

    isRead: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    referenceId: {
  type: mongoose.Schema.Types.ObjectId,
  default: null,
},

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Notification",
  notificationSchema
);