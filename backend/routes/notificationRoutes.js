const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getMyNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} = require("../controllers/notificationController");

router.get(
  "/",
  protect,
  getMyNotifications
);

router.put(
  "/:id/read",
  protect,
  markNotificationAsRead
);

router.put(
  "/read-all",
  protect,
  markAllNotificationsAsRead
);

router.delete(
  "/:id",
  protect,
  deleteNotification
);

module.exports = router;