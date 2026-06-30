const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");
const {
  createMess,
  getAllMesses,
} = require("../controllers/messController");

router.post(
  "/",
  protect,
  isAdmin,
  createMess
);

router.get(
  "/",
  protect,
  isAdmin,
  getAllMesses
);

module.exports = router;