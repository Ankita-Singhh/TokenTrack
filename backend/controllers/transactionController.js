const User = require("../models/User");
const CouponItem = require("../models/CouponItem");
const Transaction = require("../models/Transaction");
const Notification = require("../models/Notification");
const MessSettings = require("../models/MessSettings");

const deductCoupons = async (req, res) => {
  try {
    const { studentId, itemId, quantity = 1 } = req.body;

    const student = await User.findById(studentId);

    // Validation 1
    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    if (!student.mess) {
      return res.status(400).json({
        message: "Student is not assigned to a mess",
      });
    }

    // Validation 2
    if (student.role !== "student") {
      return res.status(400).json({
        message: "Invalid student",
      });
    }

    // Validation 3
    if (student.status !== "approved") {
      return res.status(400).json({
        message: "Student is not approved",
      });
    }

    const item = await CouponItem.findById(itemId);

    // Validation 4
    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    if (!item.isActive) {
      return res.status(400).json({
        message: "Item is inactive",
      });
    }

    // Validation 5
    if (quantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1",
      });
    }

    // Validation 6
    if (student.mess.toString() !== item.mess.toString()) {
      return res.status(400).json({
        message: "Student and item belong to different messes",
      });
    }

    if (item.mess.toString() !== req.user.managedMess.toString()) {
      return res.status(403).json({
        message: "You cannot manage another mess",
      });
    }

    const totalAmount = item.price * quantity;

    // Validation 7
    if (student.couponBalance < totalAmount) {
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    student.couponBalance -= totalAmount;
    student.lastTransactionAt = new Date();
    await student.save();

    // Get current mess settings
const settings = await MessSettings.findOne({
  mess: student.mess,
  isActive: true,
});

// Check if student's balance is below the threshold
if (
  settings &&
  student.couponBalance <= settings.lowBalanceThreshold
) {
  // Check if an unread low balance notification already exists
  const existingNotification = await Notification.findOne({
    recipient: student._id,
    type: "low_balance",
    isRead: false,
  });

  // Create notification only if one doesn't already exist
  if (!existingNotification) {
    await Notification.create({
      recipient: student._id,
      mess: student.mess,
      title: "Low Coupon Balance",
      message: `You have only ${student.couponBalance} amount remaining.`,
      type: "low_balance",
      createdBy: req.user._id,
    });
  }
}

    const transaction = await Transaction.create({
      student: student._id,
      item: item._id,
      itemName: item.name,
      mess: student.mess,
      amount: totalAmount,
      quantity,
      processedBy: req.user._id,
    });

    res.status(200).json({
      message: "Coupons deducted successfully",
      remainingBalance: student.couponBalance,
      transaction,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const undoTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;

    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    // Manager can only undo transactions from their own mess
    if (
      transaction.mess.toString() !==
      req.user.managedMess.toString()
    ) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    // Already reversed?
    if (transaction.status === "reversed") {
      return res.status(400).json({
        message: "Transaction already reversed",
      });
    }

    // 5-minute limit
    const now = new Date();
    const diff =
      (now - transaction.createdAt) / (1000 * 60);

    if (diff > 5) {
      return res.status(400).json({
        message:
          "Undo is allowed only within 5 minutes.",
      });
    }

    // Restore student's balance
    const student = await User.findById(
      transaction.student
    );

    student.couponBalance += transaction.amount;
await student.save();

// Check if student's balance is now above the low balance threshold
const settings = await MessSettings.findOne({
  mess: student.mess,
  isActive: true,
});

if (
  settings &&
  student.couponBalance > settings.lowBalanceThreshold
) {
  await Notification.updateMany(
    {
      recipient: student._id,
      type: "low_balance",
      isRead: false,
    },
    {
      $set: {
        isRead: true,
      },
    }
  );
}

    // Update transaction
    transaction.status = "reversed";
    transaction.reversedAt = new Date();
    transaction.reversedBy = req.user._id;

    await transaction.save();

    res.status(200).json({
      message: "Transaction reversed successfully",
      remainingBalance: student.couponBalance,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
        mess: req.user.managedMess,
    })
      .populate("student", "name rollNumber")
      .populate("processedBy", "name")
      .populate("mess", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: transactions.length,
      transactions,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  deductCoupons,
  getAllTransactions,
  undoTransaction
};
