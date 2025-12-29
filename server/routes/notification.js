const express = require("express");
const router = express.Router();

const {
  getMyNotifications,
  markAsRead,
} = require("../controllers/notification");

const { auth } = require("../middlewares/auth");

router.get("/", auth, getMyNotifications);
router.put("/:notificationId/read", auth, markAsRead);

module.exports = router;
