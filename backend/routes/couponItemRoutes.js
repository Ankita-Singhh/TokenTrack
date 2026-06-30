const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const isManager = require("../middleware/managerMiddleware");

const {
  createCouponItem,
} = require("../controllers/couponItemController");

router.post(
  "/",
  protect,
  isManager,
  createCouponItem
);

module.exports = router;