const User = require("../models/User");
const Notice = require("../models/Notice");
const Notification = require("../models/Notification");
const Mess = require("../models/Mess");
const bcrypt = require("bcryptjs");

const createManager = async (req, res) => {
  try {
    const { name, email, password } = req.body;
if (!name || !email || !password) {
  return res.status(400).json({
    message: "All fields are required",
  });
}

if (password.length < 8) {
  return res.status(400).json({
    message: "Password must be at least 8 characters long",
  });
}

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const manager = await User.create({
      name,
      email,
      password: hashedPassword,

      role: "manager",

      status: "approved",

      isApproved: true,

      managedMess: null,
    });

    res.status(201).json({
      message: "Manager created successfully",
      manager,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllManagers = async (req, res) => {
  try {
    const managers = await User.find({
      role: "manager",
    }).populate("managedMess", "name");

    res.status(200).json({
      count: managers.length,
      managers,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const assignManagerToMess = async (req, res) => {
  try {
    const { managerId, messId } = req.body;

    const manager = await User.findById(managerId);

    if (!manager) {
      return res.status(404).json({
        message: "Manager not found",
      });
    }

    if (manager.role !== "manager") {
      return res.status(400).json({
        message: "User is not a manager",
      });
    }

    if (manager.managedMess) {
      return res.status(400).json({
        message: "Manager is already assigned to a mess",
      });
    }

    const mess = await Mess.findById(messId);

    if (!mess) {
      return res.status(404).json({
        message: "Mess not found",
      });
    }

    const existingManager = await User.findOne({
      role: "manager",
      managedMess: messId,
    });

    if (existingManager) {
      return res.status(400).json({
        message: "This mess already has a manager",
      });
    }

    manager.managedMess = messId;

    await manager.save();

    res.status(200).json({
      message: "Manager assigned successfully",
      manager,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAnalytics = async (req, res) => {
  try {
    
    const Mess = require("../models/Mess");
    const Transaction = require("../models/Transaction");

    const totalMesses = await Mess.countDocuments();

    const totalManagers = await User.countDocuments({
      role: "manager",
    });


    const totalStudents = await User.countDocuments({
      role: "student",
    });


    const approvedStudents = await User.countDocuments({
      role: "student",
      status: "approved",
    });


    const pendingStudents = await User.countDocuments({
      role: "student",
      status: "pending",
    });


    const rejectedStudents = await User.countDocuments({
      role: "student",
      status: "rejected",
    });

    const totalTransactions = await Transaction.countDocuments({
  status: "completed",
});

const transactions = await Transaction.find({
  status: "completed",
}).populate("mess", "name");

const totalCouponValueUsed = transactions.reduce(
  (sum, transaction) => sum + transaction.amount,
  0,
);

const totalItemsSold = transactions.reduce(
  (sum, transaction) => sum + transaction.quantity,
  0,
);

// Find Most Active Mess
const messUsage = {};

transactions.forEach((transaction) => {
  const messName = transaction.mess?.name || "Unknown";

  messUsage[messName] = (messUsage[messName] || 0) + 1;
});

let mostActiveMess = "-";
let maxTransactions = 0;

for (const mess in messUsage) {
  if (messUsage[mess] > maxTransactions) {
    maxTransactions = messUsage[mess];
    mostActiveMess = mess;
  }
}

    res.status(200).json({
      totalMesses,
      totalManagers,
      totalStudents,
      approvedStudents,
      pendingStudents,
      rejectedStudents,
      totalTransactions,
      totalCouponValueUsed,
      totalItemsSold,
      mostActiveMess,
    });
  } catch (error) {
      console.error("Analytics Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllNotices = async (req, res) => {
  try {
    const today = new Date();
today.setHours(0, 0, 0, 0);

    const notices = await Notice.find({
  isActive: true,
})
  .populate("mess", "name")
  .populate("createdBy", "name");

    notices.sort((a, b) => {
      // Urgent notices first
      if (a.priority !== b.priority) {
        return a.priority === "urgent" ? -1 : 1;
      }

      // Newest first within same priority
      return b.createdAt - a.createdAt;
    });

    const recentNotices = notices.slice(0, 5);

    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createGlobalNotice = async (req, res) => {
  try {
    const {
      title,
      description,
      attachment,
      attachmentType,
      priority,
      expiryDate,
    } = req.body;

    const notice = await Notice.create({
      title,
      description,
      attachment,
      attachmentType,
      priority,
      expiryDate,
      isGlobal: true,
      mess: null,
      createdBy: req.user._id,
    });

    // Notify all approved students and all managers

const users = await User.find({
  $or: [
    {
      role: "manager",
    },
    {
      role: "student",
      status: "approved",
    },
  ],
});

const notifications = users.map((user) => ({
  recipient: user._id,
  mess: user.mess || null,
  title:
    priority === "urgent"
      ? "🚨 Urgent Global Notice"
      : "📢 Global Notice",
  message: `"${title}" has been posted by the Admin. Please check the Notice Board.`,
  type: "notice",
  action: "created",
  createdBy: req.user._id,
}));

if (notifications.length > 0) {
  await Notification.insertMany(notifications);
}

    res.status(201).json({
      message: "Global notice created successfully",
      notice,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;

    const notice = await Notice.findById(id);

    if (!notice) {
      return res.status(404).json({
        message: "Notice not found",
      });
    }

    await Notice.findByIdAndDelete(id);

    res.status(200).json({
      message: "Notice deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateNotice = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      priority,
      expiryDate,
      attachment,
      attachmentType,
    } = req.body;

    const notice = await Notice.findById(id);

    if (!notice) {
      return res.status(404).json({
        message: "Notice not found",
      });
    }

    notice.title = title;
    notice.description = description;
    notice.priority = priority;
    notice.expiryDate = expiryDate;
    notice.attachment = attachment;
    notice.attachmentType = attachmentType;

    await notice.save();

    res.status(200).json({
      message: "Notice updated successfully",
      notice,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  assignManagerToMess,
  createManager,
  getAllManagers,
  createGlobalNotice,
  getAllNotices,
  getAnalytics,
    deleteNotice,
    updateNotice,
};
