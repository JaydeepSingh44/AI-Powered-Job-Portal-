const Notification = require("../models/notification");

/* ================= CREATE NOTIFICATION ================= */
exports.createNotification = async (data) => {
  try {
    await Notification.create(data);
  } catch (error) {
    console.log("CREATE NOTIFICATION ERROR →", error);
  }
};

/* ================= GET MY NOTIFICATIONS ================= */
exports.getMyNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    let filter = {};

    if (role === "jobSeeker") filter.toJobSeeker = userId;
    if (role === "company") filter.toCompany = userId;

    const notifications = await Notification.find(filter)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notifications.length,
      notifications,
    });

  } catch (error) {
    console.log("GET NOTIFICATIONS ERROR →", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ================= MARK AS READ ================= */
exports.markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
    });

  } catch (error) {
    console.log("MARK READ ERROR →", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
