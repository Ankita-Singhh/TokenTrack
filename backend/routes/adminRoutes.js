const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

const {
  assignManagerToMess,
  createManager,
  getAllManagers,
  getAnalytics,
  getAllNotices,
  createGlobalNotice,
  deleteNotice,
  updateNotice,
} = require("../controllers/adminController");

router.put(
  "/assign-manager",
  protect,
  isAdmin,
  assignManagerToMess
);

router.post(
  "/create-manager",
  protect,
  isAdmin,
  createManager
);

router.get(
  "/managers",
  protect,
  isAdmin,
  getAllManagers
);

router.get(
  "/analytics",
  protect,
  isAdmin,
  getAnalytics
);

router.post("/notices", protect, isAdmin, createGlobalNotice);
router.get("/notices", protect, isAdmin, getAllNotices);

router.delete(
  "/notices/:id",
  protect,
  isAdmin,
  deleteNotice
);

router.put(
  "/notices/:id",
  protect,
  isAdmin,
  updateNotice
);


module.exports = router;
