const Notice = require("../models/Notice");
const Notification = require("../models/Notification");
const User = require("../models/User");

// Create Notice
const createNotice = async (req, res) => {
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
      mess: req.user.managedMess,
      createdBy: req.user._id,
    });

    // Send notification to all approved students of this mess
    const students = await User.find({
      role: "student",
      mess: req.user.managedMess,
      status: "approved",
    });

    const notifications = students.map((student) => ({
      recipient: student._id,
      mess: req.user.managedMess,
      title: priority === "urgent" ? "🚨 Urgent Notice" : "📢 New Notice",
      message: `"${title}" has been posted. Check the Notice Board for details.`,
      type: "notice",
      action: "created",
      createdBy: req.user._id,
    }));

    if (notifications.length > 0) {
      await Notification.insertMany(notifications);
    }

    res.status(201).json({
      message: "Notice created successfully",
      notice,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Manager - Get All Notices
const getManagerNotices = async (req, res) => {
  try {
    const today = new Date();
today.setHours(0, 0, 0, 0);
    const notices = await Notice.find({
  isActive: true,
  expiryDate: {
    $gte: new Date(),
  },
  $or: [
    {
      mess: req.user.managedMess,
    },
    {
      isGlobal: true,
    },
  ],
}).populate("createdBy", "name");

    notices.sort((a, b) => {
      if (a.priority !== b.priority) {
        return a.priority === "urgent" ? -1 : 1;
      }

      return b.createdAt - a.createdAt;
    });

    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAdminNotices = async (req, res) => {
  try {
    const today = new Date();
today.setHours(0, 0, 0, 0);
    const notices = await Notice.find({
  isActive: true,
  expiryDate: {
    $gte: new Date(),
  },
})
.populate("createdBy", "name")
.populate("mess", "name");

notices.sort((a, b) => {
  if (a.priority !== b.priority) {
    return a.priority === "urgent" ? -1 : 1;
  }

  return b.createdAt - a.createdAt;
});

const recentNotices = notices.slice(0, 5);

res.status(200).json(recentNotices);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Student - Get Active Notices
const getStudentNotices = async (req, res) => {
  try {
    const today = new Date();
today.setHours(0, 0, 0, 0);
    const notices = await Notice.find({
  isActive: true,
  expiryDate: {
    $gte: new Date(),
  },
  $or: [
    {
      mess: req.user.mess,
    },
    {
      isGlobal: true,
    },
  ],
}).populate("createdBy", "name");

    notices.sort((a, b) => {
      if (a.priority === b.priority) {
        return b.createdAt - a.createdAt;
      }
      return a.priority === "urgent" ? -1 : 1;
    });

    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Notice
const updateNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({
        message: "Notice not found",
      });
    }

    if (notice.mess.toString() !== req.user.managedMess.toString()) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    notice.title = req.body.title ?? notice.title;
    notice.description = req.body.description ?? notice.description;
    notice.priority = req.body.priority ?? notice.priority;
    notice.expiryDate = req.body.expiryDate ?? notice.expiryDate;
    notice.attachment = req.body.attachment ?? notice.attachment;
    notice.attachmentType = req.body.attachmentType ?? notice.attachmentType;
    await notice.save();
    const students = await User.find({
      role: "student",
      mess: req.user.managedMess,
      status: "approved",
    });

    const notifications = students.map((student) => ({
      recipient: student._id,
      mess: req.user.managedMess,
      title: "✏️ Notice Updated",
      message: `"${notice.title}" has been updated. Please check the latest information.`,
      type: "notice",
      action: "updated",
      createdBy: req.user._id,
    }));

    if (notifications.length > 0) {
      await Notification.insertMany(notifications);
    }

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

// Delete Notice (Soft Delete)
const deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({
        message: "Notice not found",
      });
    }

    if (notice.mess.toString() !== req.user.managedMess.toString()) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    notice.isActive = false;

    await notice.save();

    const students = await User.find({
      role: "student",
      mess: req.user.managedMess,
      status: "approved",
    });

    const notifications = students.map((student) => ({
      recipient: student._id,
      mess: req.user.managedMess,
      title: "🗑️ Notice Removed",
      message: `"${notice.title}" has been removed by the manager.`,
      type: "notice",
      action: "deleted",
      createdBy: req.user._id,
    }));

    if (notifications.length > 0) {
      await Notification.insertMany(notifications);
    }

    res.status(200).json({
      message: "Notice deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createNotice,
  getManagerNotices,
  getStudentNotices,
  updateNotice,
  deleteNotice,
  getAdminNotices,
};
