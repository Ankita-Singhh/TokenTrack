const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    mess: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mess",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    priority: {
      type: String,
      enum: ["normal", "urgent"],
      default: "normal",
    },

    expiryDate: {
      type: Date,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isGlobal: {
      type: Boolean,
      default: false,
    },

    attachment: {
      type: String,
      default: "",
    },

    attachmentType: {
      type: String,
      enum: ["image", "pdf", "other"],
      default: "other",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Notice", noticeSchema);
