const asyncHandler = require("express-async-handler");
const {
  Notification,
  validateCreateNotification,
} = require("../models/Notification");
const { User } = require("../models/User");
const admin = require("firebase-admin");
const serviceAccount = require("../config/atmetha-firebase-adminsdk-ehweb-930571776c.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

/**-----------------------------------------------
 * @desc    Get All Notifications
 * @route   /api/notification
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getAllNotificationsCtrl = asyncHandler(async (req, res) => {
  let notifications;
  const { page, perPage } = req.query;
  if (page && perPage) {
    notifications = await Notification.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
  } else {
    notifications = await Notification.find().sort({ createdAt: -1 });
  }
  const documentCount = await Notification.countDocuments();
  res
    .status(200)
    .json({ notifications, totalCount: notifications.length, documentCount });
});

/**-----------------------------------------------
 * @desc    Create Notifications
 * @route   /api/notification
 * @method  POST
 * @access  public
 ------------------------------------------------*/
module.exports.createNotificationCtrl = asyncHandler(async (req, res) => {
  const { error } = validateCreateNotification(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const message = {
    notification: {
      title: req.body.title,
      body: req.body.body,
    },
  };
  let allUsers = [];
  let yesAll = null,
    userNumber = null;

  if (req.body.allUsers === "ALL") {
    allUsers = await User.find();
    yesAll = "مستخدمي التطبيق";
  } else {
    const oneUser = await User.findById(req.body.user);
    yesAll = oneUser.username;
    userNumber = oneUser.phoneNumber;
    allUsers.push(oneUser);
  }

  allUsers.forEach(async (user) => {
    if (user.fcmToken) {
      admin
        .messaging()
        .sendToDevice(user.fcmToken, message)
        .catch((err) => {
          return res.status(500).json({ message: "internet error" });
        });
    }
  });

  const notification = new Notification({
    title: req.body.title,
    body: req.body.body,
    user: req.body.user || null,
    allUsers: yesAll,
    userNumber: userNumber,
  });
  await notification.save();

  return res
    .status(200)
    .json({ message: "message has been sent successfully" });
});

/**-----------------------------------------------
 * @desc   Delete One Notification
 * @route   /api/notification/:id
 * @method  Delete
 * @access  public
 ------------------------------------------------*/

module.exports.deleteNotificationCtrl = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    return res.status(404).json({ message: "message not found" });
  }

  await Notification.findByIdAndDelete(req.params.id);
  return res
    .status(200)
    .json({ message: "message has been deleted successfully" });
});
