const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

//schema of user

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    phoneNumber: {
      type: String,
      minLength: 10,
      maxLength: 10,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
      maxLength: 100,
      unique: true,
    },
    passwordAgain: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    profilePhoto: {
      type: Object,
      default: {
        url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        publicId: null,
      },
    },
    savedCode: {
      type: String,
      minLength: 5,
      maxLength: 5,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    room: {
      type: String,
      trim: true,
    },
    //   favorite: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    role: {
      type: String,
      enum: ["superAdmin", "admin", "user"],
      default: "user",
    },
    wrong: {
      type: Number,
      default: 0,
    },
    right: {
      type: Number,
      default: 0,
    },
    fcmToken: {
      type: String,
    },
    chooseSide: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Side",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserSchema.virtual("codes", {
  ref: "Code",
  foreignField: "user",
  localField: "_id",
});

// UserSchema.virtual("questions", {
//   ref: "Question",
//   foreignField: "user",
//   localField: "_id",
// });

// UserSchema.virtual("chats", {
//   ref: "Chat",
//   foreignField: "user",
//   localField: "_id",
// });

UserSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
};

const User = mongoose.model("User", UserSchema);

const validateRegisterUser = (obj) => {
  const schema = Joi.object({
    username: Joi.string().trim().min(2).max(100).required(),
    phoneNumber: Joi.string().trim().min(10).max(10).required(),
    email: Joi.string().trim().min(5).max(100).required().email(),
    password: Joi.string().trim().min(8).required(),
    passwordAgain: Joi.string().trim().min(8).required(),
    gender: Joi.string().valid("male", "female").required(),
    fcmToken: Joi.string(),
  });

  return schema.validate(obj);
};

const validateRegisterAdmin = (obj) => {
  const schema = Joi.object({
    username: Joi.string().trim().min(2).max(100).required(),
    phoneNumber: Joi.string().trim().min(10).max(10).required(),
    email: Joi.string().trim().min(5).max(100).required().email(),
    password: Joi.string().trim().min(8).required(),
    gender: Joi.string().valid("male", "female").required(),
    role: Joi.string().valid("admin", "superAdmin").required(),
    fcmToken: Joi.string(),
  });

  return schema.validate(obj);
};

const validateLoginUser = (obj) => {
  const schema = Joi.object({
    phoneNumber: Joi.string().trim().min(10).max(10).required(),
    password: Joi.string().trim().min(8).required(),
    fcmToken: Joi.string(),
  });

  return schema.validate(obj);
};

const validateUpdateUser = (obj) => {
  const schema = Joi.object({
    username: Joi.string().trim().min(2).max(100),
    gender: Joi.string().valid("male", "female"),
    email: Joi.string().trim().min(5).max(100).email(),
  });

  return schema.validate(obj);
};

module.exports = {
  User,
  validateRegisterUser,
  validateLoginUser,
  validateUpdateUser,
  validateRegisterAdmin,
};
