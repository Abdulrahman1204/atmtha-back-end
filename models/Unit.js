const mongoose = require("mongoose");
const Joi = require("joi");

// Unit Schema
const UnitSchema = new mongoose.Schema(
  {
    unitName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    subjectName: {
      type: String,
      trim: true,
    },
    number: {
      type: Number,
      required: true,
      minlength: 1,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Populate lessons For This unit
UnitSchema.virtual("lessons", {
  ref: "Lesson",
  foreignField: "unit",
  localField: "_id",
});

// Unit Model
const Unit = mongoose.model("Unit", UnitSchema);

// Validate Create Unit
function validateCreateUnit(obj) {
  const schema = Joi.object({
    unitName: Joi.string().trim().min(1).required(),
    number: Joi.number().required(),
    subject: Joi.string().required(),
  });
  return schema.validate(obj);
}

// Validate Update Unit
function validateUpdateUnit(obj) {
  const schema = Joi.object({
    unitName: Joi.string().trim().min(1).max(100),
    number: Joi.number().min(1),
  });
  return schema.validate(obj);
}

module.exports = {
  Unit,
  validateCreateUnit,
  validateUpdateUnit,
};
