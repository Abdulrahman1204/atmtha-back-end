const router = require("express").Router();
const {
  getAllUsersCtrl,
  getUserProfileCtrl,
  updateUserProfileCtrl,
  profilePhotoUploadCtrl,
  deleteUserProfileCtrl,
  getAllAdminsCtrl,
  chooseSideCtrl,
} = require("../controllers/usersController");
const {
  verifyToken,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId");
const photoUpload = require("../middlewares/photoUpload");

// /api/users/profile
router.route("/profile").get(getAllUsersCtrl);

// /api/users/chooseSide
router.route("/chooseSide").post(verifyToken, chooseSideCtrl);

// /api/users/profile/admin
router.route("/profile/admin").get(getAllAdminsCtrl);

// /api/users/profile/profile-photo-upload
router
  .route("/profile/profile-photo-upload")
  .post(verifyToken, photoUpload.single("image"), profilePhotoUploadCtrl);

// /api/users/profile/:id
router
  .route("/profile/:id")
  .get(validateObjectId, getUserProfileCtrl)
  .delete(validateObjectId, verifyTokenAndAuthorization, deleteUserProfileCtrl)
  .put(validateObjectId, updateUserProfileCtrl);

module.exports = router;
