const User = require("../models/User");
const Transaction = require("../models/Transaction");

const getDashboardAnalytics = async (req, res) => {
  try {
    const messId = req.user.managedMess;
    const totalStudents = await User.countDocuments({
      role: "student",
      mess: messId,
    });

    const approvedStudents =
      await User.countDocuments({
        role: "student",
        status: "approved",
        mess: messId,
      });

    const pendingStudents =
      await User.countDocuments({
        role: "student",
        status: "pending",
        mess: messId,
      });

    const rejectedStudents =
      await User.countDocuments({
        role: "student",
        mess: messId,
        status: "rejected",
      });

    const totalTransactions =
      await Transaction.countDocuments({
        mess: messId,
      });

    const transactions =
      await Transaction.find({
        mess: messId,
      });

    const totalCouponValueUsed =
      transactions.reduce(
        (sum, transaction) =>
          sum + transaction.amount,
        0
      );

    res.status(200).json({
      totalStudents,
      approvedStudents,
      pendingStudents,
      rejectedStudents,
      totalTransactions,
      totalCouponValueUsed,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardAnalytics,
};