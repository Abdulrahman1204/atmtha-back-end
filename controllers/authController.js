const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const {
  User,
  validateRegisterUser,
  validateLoginUser,
  validateRegisterAdmin,
} = require("../models/User");
/**-----------------------------------------------
 * @desc    Register New User
 * @route   /api/auth/register
 * @method  POST
 * @access  public
 ------------------------------------------------*/
module.exports.registerUserCtrl = asyncHandler(async (req, res) => {
  const { error } = validateRegisterUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  let user = await User.findOne({ phoneNumber: req.body.phoneNumber });
  let user1 = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "phone number already exist" });
  }

  if (user1) {
    return res.status(400).json({ message: "email already exist" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  user = new User({
    username: req.body.username,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    password: hashedPassword,
    passwordAgain: hashedPassword,
    gender: req.body.gender,
    fcmToken: req.body.fcmToken || null,
  });
  await user.save();

  //   // Creating new VerificationToken & save it toDB
  //   const verifictionToken = new VerificationToken({
  //     userId: user._id,
  //     token: crypto.randomBytes(32).toString("hex"),
  //   });
  //   await verifictionToken.save();

  //   // Making the link
  //   const link = `${process.env.CLIENT_DOMAIN}/users/${user._id}/verify/${verifictionToken.token}`;

  //   // Putting the link into an html template
  //   const htmlTemplate = `
  //       <div>
  //         <p>Click on the link below to verify your email</p>
  //         <a href="${link}">Verify</a>
  //       </div>`;

  //   // Sending email to the user
  //   await sendEmail(user.email, "Verify Your Email", htmlTemplate);

  // Response to the client
  const token = user.generateAuthToken();
  res.status(201).json({
    message: "You register successfully",
    user: {
      _id: user._id,
      role: user.role,
      profilePhoto: user.profilePhoto,
      token,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    },
  });
});

/**-----------------------------------------------
 * @desc    Login User
 * @route   /api/auth/login
 * @method  POST
 * @access  public
 ------------------------------------------------*/
module.exports.loginUserCtrl = asyncHandler(async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const user = await User.findOne({ phoneNumber: req.body.phoneNumber });
  if (!user) {
    return res
      .status(400)
      .json({ message: "invalid phone number or password" });
  }

  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "invalid email or password" });
  }

  //   if (!user.isAccountVerified) {
  //     let verificationToken = await VerificationToken.findOne({
  //       userId: user._id,
  //     });

  //     if (!verificationToken) {
  //       verificationToken = new VerificationToken({
  //         userId: user._id,
  //         token: crypto.randomBytes(32).toString("hex"),
  //       });
  //       await verificationToken.save();
  //     }

  //     const link = `${process.env.CLIENT_DOMAIN}/users/${user._id}/verify/${verificationToken.token}`;

  //     const htmlTemplate = `
  //       <div>
  //         <p>Click on the link below to verify your email</p>
  //         <a href="${link}">Verify</a>
  //       </div>`;

  //     await sendEmail(user.email, "Verify Your Email", htmlTemplate);

  //     return res.status(400).json({
  //       message: "We sent to you an email, please verify your email address",
  //     });
  //   }

  if (req.body.fcmToken) {
    user.fcmToken = req.body.fcmToken;
    await user.save();
  }

  const token = user.generateAuthToken();
  res.status(200).json({
    message: "You login successfully",
    user: {
      _id: user._id,
      role: user.role,
      profilePhoto: user.profilePhoto,
      token,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    },
  });
});

/**-----------------------------------------------
 * @desc    Login Admin
 * @route   /api/auth/login_admin
 * @method  POST
 * @access  public
 ------------------------------------------------*/
module.exports.loginAdminCtrl = asyncHandler(async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const user = await User.findOne({ phoneNumber: req.body.phoneNumber });
  if (!user) {
    return res
      .status(400)
      .json({ message: "invalid phone number or password" });
  }

  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "invalid email or password" });
  }

  if (user.role === "user") {
    return res.status(400).json({ message: "you are not allowed to login" });
  }

  const token = user.generateAuthToken();
  res.status(200).json({
    message: "you logged successfully",
    user: {
      _id: user._id,
      role: user.role,
      profilePhoto: user.profilePhoto,
      token,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    },
  });
});

/**-----------------------------------------------
 * @desc    Register New Admin
 * @route   /api/auth/register_admin
 * @method  POST
 * @access  public
 ------------------------------------------------*/
module.exports.registerAdminCtrl = asyncHandler(async (req, res) => {
  const { error } = validateRegisterAdmin(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  let user = await User.findOne({ phoneNumber: req.body.phoneNumber });
  let user1 = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "phone number already exist" });
  }

  if (user1) {
    return res.status(400).json({ message: "email already exist" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  user = new User({
    username: req.body.username,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    password: hashedPassword,
    passwordAgain: hashedPassword,
    gender: req.body.gender,
    role: req.body.role,
  });
  await user.save();

  // Response to the client
  res.status(201).json({
    message: "you registered successfully",
    user: {
      _id: user._id,
      role: user.role,
      profilePhoto: user.profilePhoto,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    },
  });
});
