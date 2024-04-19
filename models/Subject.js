const mongoose = require("mongoose");
const Joi = require("joi");

const SubjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 100,
    },
    side: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Side",
        required: true,
      },
    ],
    sideName: {
      type: String,
    },
    questionDuration: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }, 
  }
);

// Populate unit For This subject
SubjectSchema.virtual("units", {
  ref: "Unit",
  foreignField: "subject",
  localField: "_id",
});

SubjectSchema.virtual("questions", {
  ref: "Question",
  foreignField: "subject",
  localField: "_id",
});

const validateCreateSubject = (obj) => {
  const schema = Joi.object({
    name: Joi.string().trim().min(2).max(100).required(),
    side: Joi.array().items(Joi.string().required()).required(),
    questionDuration: Joi.number().min(1).max(10000).required(),
  });

  return schema.validate(obj);
};

const validateUpdateSubject = (obj) => {
  const schema = Joi.object({
    name: Joi.string().trim().min(2).max(100),
    side: Joi.array().items(Joi.string().required()),
    questionDuration: Joi.number().min(1).max(10000),
  });

  return schema.validate(obj);
};

const Subject = mongoose.model("Subject", SubjectSchema);

module.exports = {
  Subject,
  validateCreateSubject,
  validateUpdateSubject,
};
