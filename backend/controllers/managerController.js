const User = require("../models/User");
const Mess = require("../models/Mess");
const MessSettings = require("../models/MessSettings");
const Transaction = require("../models/Transaction");

const getPendingStudents = async (req, res) => {
  try {
    const students = await User.find({
      role: "student",
      status: "pending",
    }).select("-password");

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const approveStudent = async (req, res) => {
  try {
    const { studentId } = req.body;
    const messId = req.user.managedMess;

    const student = await User.findById(studentId);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    if (student.role !== "student") {
  return res.status(400).json({
    message: "Only students can be approved",
  });
}

    if (student.status === "approved") {
  return res.status(400).json({
    message: "Student already approved",
  });
}

    const mess = await Mess.findById(messId);

    if (!mess) {
      return res.status(404).json({
        message: "Mess not found",
      });
    }

    const settings = await MessSettings.findOne({
      mess: messId,
      isActive: true,
    });

    if (!settings) {
      return res.status(400).json({
        message: "Configure settings for this mess first",
      });
    }

    const balance =
      settings.couponsPerSemester *
      settings.couponValue;

    student.isApproved = true;
    student.status = "approved";
    student.mess = messId;
    student.couponBalance = balance;
    student.assignedBy = req.user._id;
    student.approvedAt = new Date();
    student.rejectionReason = "";

    await student.save();
    const updatedStudent = await User.findById(student._id)
    .select("-password")
  .populate("assignedBy", "name")
  .populate("mess", "name");

    res.status(200).json({
      message: "Student approved successfully",
      student: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const rejectStudent = async (req, res) => {
  try {
    const { studentId, reason } = req.body;

    const student = await User.findById(studentId);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    if (student.role !== "student") {
      return res.status(400).json({
        message: "Only students can be rejected",
      });
    }

    student.status = "rejected";
    student.isApproved = false;
    student.rejectionReason = reason;

    await student.save();

    res.status(200).json({
      message: "Student rejected successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

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

const searchStudentByRollNo = async (req, res) => {
  try {
    const { rollNumber } = req.params;

    const managerMess = req.user.managedMess;

    const student = await User.findOne({
      rollNumber,
      role: "student",
      mess: managerMess,
      status: "approved",
    })
      .select("-password")
      .populate("assignedBy", "name")
      .populate("mess", "name");

    if (!student) {
      return res.status(404).json({
        message: "Student not found in your mess",
      });
    }

    res.status(200).json({
      message: "Student found successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getPendingStudents,
  searchStudentByRollNo,
  approveStudent,
  rejectStudent,
  getDashboardAnalytics,
};