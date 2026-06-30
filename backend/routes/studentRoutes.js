const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const isStudent = require("../middleware/studentMiddleware");

const {
  getDashboard,
  getTransactions
} = require("../controllers/studentController");

router.get(
  "/dashboard",
  protect,
  isStudent,  
  getDashboard
);

router.get(
  "/transactions",
  protect,
  isStudent,
  getTransactions
);

module.exports = router;