const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    rollNumber: {
      type: String,
      required: function () {
        return this.role === "student";
      },
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    approvedAt: {
      type: Date,
      default: null,
    },

    role: {
  type: String,
  enum: ["student", "manager", "admin"],
  default: "student",
},

    profilePic: {
      type: String,
      default: "",
    },

    isApproved: {
      type: Boolean,
      default: false,
    },

    lastTransactionAt: {
  type: Date,
  default: null,
},

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    rejectionReason: {
      type: String,
      default: "",
    },

    mess: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Mess",
  default: null,
},

managedMess: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Mess",
  default: null,
},

    couponBalance: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.index(
  { rollNumber: 1 },
  {
    unique: true,
    partialFilterExpression: {
      role: "student",
    },
  }
);

module.exports = mongoose.model("User", userSchema);
