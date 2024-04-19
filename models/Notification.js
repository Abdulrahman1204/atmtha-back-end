const mongoose = require("mongoose");
const Joi = require("joi");

const NotificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 300,
    },
    body: {
      type: String,
      required: true,
      minLength: 2,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    allUsers: {
      type: String,
    },
    userNumber: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const validateCreateNotification = (obj) => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(300).required(),
    body: Joi.string().min(2).required(),
    user: Joi.string(),
    allUsers: Joi.string(),
  });

  return schema.validate(obj);
};

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = {
  Notification,
  validateCreateNotification,
};
