const asyncHandler = require("express-async-handler");
const { User, validateUpdateUser } = require("../models/User");
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
} = require("../utils/cloudinary");

/**-----------------------------------------------
 * @desc    Get All Users Profile
 * @route   /api/users/profile
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getAllUsersCtrl = asyncHandler(async (req, res) => {
  let users;
  const { page, perPage } = req.query;
  if (page && perPage) {
    users = await User.find({ role: "user" })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 })
      .select("-password")
      .populate("codes");
  } else {
    users = await User.find({ role: "user" })
      .sort({ createdAt: -1 })
      .select("-password")
      .populate("codes");
  }
  const documentCount = await User.countDocuments({ role: "user" });
  res.status(200).json({ users, totalCount: users.length, documentCount });
});

/**-----------------------------------------------
 * @desc    Get All Admin Profile
 * @route   /api/user/profile
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getAllAdminsCtrl = asyncHandler(async (req, res) => {
  let admins;
  const { page, perPage } = req.query;
  if (page && perPage) {
    admins = await User.find({
      $or: [{ role: "admin" }, { role: "superAdmin" }],
    })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 })
      .select("-password")
      .populate("codes");
  } else {
    admins = await User.find({
      $or: [{ role: "admin" }, { role: "superAdmin" }],
    })
      .sort({ createdAt: -1 })
      .select("-password")
      .populate("codes");
  }
  const documentCount = await User.countDocuments({
    $or: [{ role: "admin" }, { role: "superAdmin" }],
  });

  const totalCount = admins.length;
  res.status(200).json({ admins, totalCount, documentCount });
});

/**-----------------------------------------------
 * @desc    Get User Profile
 * @route   /api/users/profile/:id
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getUserProfileCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select("-password")
    .populate("codes");
  // .populate("questions")
  // .populate("chats");

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  res.status(200).json(user);
});

/**-----------------------------------------------
 * @desc    Update User Profile
 * @route   /api/users/profile/:id
 * @method  PUT
 * @access  private (only user himself)
 ------------------------------------------------*/
module.exports.updateUserProfileCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  const { error } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,           
    {
      $set: {
        username: req.body.username,
        gender: req.body.gender,
        email: req.body.email,
      },
    },
    { new: true }
  ).select("-password");
  // .populate("codes")
  // .populate("questions")
  // .populate("chats");

  res.status(200).json(updatedUser);
});

/**-----------------------------------------------
 * @desc    Profile Photo Upload
 * @route   /api/users/profile/profile-photo-upload
 * @method  POST
 * @access  private (only logged in user)
 ------------------------------------------------*/
module.exports.profilePhotoUploadCtrl = asyncHandler(async (req, res) => {
  // 1. Validation
  if (!req.file) {
    return res.status(400).json({ message: "no file provided" });
  }

  // 2. Get the path to the image
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);

  // 3. Upload to cloudinary
  const result = await cloudinaryUploadImage(imagePath);

  // 4. Get the user from DB
  const user = await User.findById(req.user.id);

  //   5. Delete the old profile photo if exist
  if (user.profilePhoto?.publicId !== null) {
    await cloudinaryRemoveImage(user.profilePhoto.publicId);
  }

  // 6. Change the profilePhoto field in the DB
  user.profilePhoto = {
    url: result.secure_url,
    publicId: result.public_id,
  };
  await user.save();

  // 7. Send response to client
  res.status(200).json({
    message: "your profile photo uploaded successfully",
    profilePhoto: { url: result.secure_url, publicId: result.public_id },
  });

  // 8. Remvoe image from the server
  fs.unlinkSync(imagePath);
});

/**-----------------------------------------------
 * @desc    Delete User Profile (Account)
 * @route   /api/users/profile/:id
 * @method  DELETE
 * @access  private (only admin or user himself)
 ------------------------------------------------*/
module.exports.deleteUserProfileCtrl = asyncHandler(async (req, res) => {
  // 1. Get the user from DB
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  // 5. Delete the profile picture from cloudinary
  if (user.profilePhoto.publicId !== null) {
    await cloudinaryRemoveImage(user.profilePhoto.publicId);
  }

  // 7. Delete the user himself
  await User.findByIdAndDelete(req.params.id);

  // 8. Send a response to the client
  res.status(200).json({ message: "profile has been deleted" });
});


/**-----------------------------------------------
 * @desc    CHOOSE SIDE
 * @route   /api/users/chooseSide
 * @method  POST
 * @access  public
 ------------------------------------------------*/
 module.exports.chooseSideCtrl = asyncHandler(async (req, res) => {
  const {sideId} = req.query;
  if(!sideId){
    return res.status(400).json({message:"some query is missed"})
  }
  console.log(req.user);
  const user = await User.findById(req.user.id)
  user.chooseSide = sideId;
  user.save();
  res.status(200).json({message:"side has been choosen successfully"});
});