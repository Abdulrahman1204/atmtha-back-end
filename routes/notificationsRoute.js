const {
  getAllNotificationsCtrl,
  deleteNotificationCtrl,
  createNotificationCtrl,
} = require("../controllers/notificationsController");

const router = require("express").Router();
// /api/notifications
router.route("/").get(getAllNotificationsCtrl).post(createNotificationCtrl);
// /api/notifications/:id
router.route("/:id").delete(deleteNotificationCtrl);
module.exports = router;
