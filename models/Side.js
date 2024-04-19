const mongoose = require("mongoose");
const Joi = require("joi");

const SideSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: ["علمي", "أدبي"],
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

SideSchema.virtual("subjects", {
  ref: "Subject",
  foreignField: "side",
  localField: "_id",
});

const validateCreateSide = (obj) => {
  const schema = Joi.object({
    name: Joi.string().valid("علمي", "أدبي").required(),
  });

  return schema.validate(obj);
};

const Side = mongoose.model("Side", SideSchema);

module.exports = {
  Side,
  validateCreateSide,
};
