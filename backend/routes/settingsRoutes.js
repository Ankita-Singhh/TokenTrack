const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const isManager = require("../middleware/managerMiddleware");

const {
  createOrUpdateSettings,
} = require("../controllers/settingsController");

router.post(
  "/",
  protect,
  isManager,
  createOrUpdateSettings
);

module.exports = router;