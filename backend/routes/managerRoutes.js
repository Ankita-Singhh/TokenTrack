const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const isManager = require("../middleware/managerMiddleware");

const {
  getPendingStudents,
    approveStudent,
    rejectStudent,
    getDashboardAnalytics,
    searchStudentByRollNo,
} = require("../controllers/managerController");

router.get(
  "/pending-students",
  protect,
  isManager,
  getPendingStudents
);

router.put(
  "/approve",
  protect,
  isManager,
  approveStudent
);

router.put(
  "/reject",
  protect,
  isManager,
  rejectStudent
);

router.get(
  "/analytics",
  protect,
  isManager,
  getDashboardAnalytics
);

router.get(
  "/student/search/:rollNumber",
  protect,
  isManager,
  searchStudentByRollNo
);

module.exports = router;