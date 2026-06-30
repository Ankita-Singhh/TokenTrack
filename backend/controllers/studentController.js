const User = require("../models/User");
const Transaction = require("../models/Transaction");

const getDashboard = async (req, res) => {
  try {
    const student = await User.findById(req.user._id)
      .populate("mess","name");

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      name: student.name,
      email: student.email,

      status: student.status,

      assignedMess: student.mess
        ? student.mess.name
        : null,

      couponBalance: student.couponBalance,

      approvedAt: student.approvedAt,

      rejectionReason: student.rejectionReason,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      student: req.user._id,
    })
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
  getDashboard,
  getTransactions,
};