const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const isManager = require("../middleware/managerMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

const {
  createNotice,
  getManagerNotices,
  getAdminNotices,
  getStudentNotices,
  updateNotice,
  deleteNotice,
} = require("../controllers/noticeController");


// Manager
router.post("/", protect, isManager, createNotice);

// Admin
router.get("/admin", protect, isAdmin, getAdminNotices
);

router.get("/manager", protect, isManager, getManagerNotices);

router.put("/:id", protect, isManager, updateNotice);

router.delete("/:id", protect, isManager, deleteNotice);

// Student
router.get("/student", protect, getStudentNotices);

module.exports = router;