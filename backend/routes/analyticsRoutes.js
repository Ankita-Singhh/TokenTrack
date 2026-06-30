const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const isManager = require("../middleware/managerMiddleware");

const {
  getDashboardAnalytics,
} = require("../controllers/analyticsController");

router.get(
  "/dashboard",
  protect,
  isManager,
  getDashboardAnalytics
);

module.exports = router;