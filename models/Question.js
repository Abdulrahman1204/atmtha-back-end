const mongoose = require("mongoose");
const Joi = require("joi");

// Question Schema
const QuestionSchema = new mongoose.Schema(
  {
    imageQuestion: {
      type: Object,
      default: {
        url: "null",
        publicId: null,
      },
    },
    lessonName: {
      type: String,
      trim: true,
    },
    unitName: {
      type: String,
      trim: true,
    },
    subjectName: {
      type: String,
      trim: true,
    },
    question: {
      type: String,
      required: true,
      trim: true,
    },
    aAnswer: {
      type: String,
      required: true,
      trim: true,
    },
    bAnswer: {
      type: String,
      required: true,
      trim: true,
    },
    cAnswer: {
      type: String,
      required: true,
      trim: true,
    },
    dAnswer: {
      type: String,
      required: true,
      trim: true,
    },
    correctAnswer: {
      type: String,
      enum: ["a", "b", "c", "d"],
      required: true,
      trim: true,
    },
    unit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit",
      required: true,
    },
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      required: true,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["سهل", "متوسط", "صعب"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Question Model
const Question = mongoose.model("Question", QuestionSchema);

function validateGenerateExam(obj) {
  const schema = Joi.object({
    subjectId: Joi.string().trim().required(),
    numberOfQuestions: Joi.number().valid(20, 40).required(),
  });
  return schema.validate(obj);
}

// Answer Model
function validateIsCorrectAnswer(obj) {
  const schema = Joi.object({
    questionId: Joi.string().trim().required(),
    correctAnswer: Joi.number().valid("a", "b", "c", "d").required(),
  });
  return schema.validate(obj);
}

// validate create Question
function validateCreateQuestion(obj) {
  const schema = Joi.object({
    question: Joi.string().trim().required(),
    aAnswer: Joi.string().trim().required(),
    bAnswer: Joi.string().trim().required(),
    cAnswer: Joi.string().trim().required(),
    dAnswer: Joi.string().trim().required(),
    correctAnswer: Joi.string().trim().required(),
    lesson: Joi.string().required(),
    subject: Joi.string().required(),
    unit: Joi.string().required(),
    difficulty: Joi.string().valid("صعب", "سهل", "متوسط").required(),
  });
  return schema.validate(obj);
}

function validateCreateQuestionUsingFile(obj) {
  const schema = Joi.object({
    question: Joi.string().trim().required(),
    aAnswer: Joi.string().trim().required(),
    bAnswer: Joi.string().trim().required(),
    cAnswer: Joi.string().trim().required(),
    dAnswer: Joi.string().trim().required(),
    correctAnswer: Joi.string().trim().required(),
    difficulty: Joi.string().valid("صعب", "سهل", "متوسط").required(),
  });
  return schema.validate(obj);
}

// validate Update Question
function validateUpdateQuestion(obj) {
  const schema = Joi.object({
    question: Joi.string().trim(),
    aAnswer: Joi.string().trim(),
    bAnswer: Joi.string().trim(),
    cAnswer: Joi.string().trim(),
    dAnswer: Joi.string().trim(),
    correctAnswer: Joi.string().trim(),
    lesson: Joi.string(),
    subject: Joi.string(),
    unit: Joi.string(),
    difficulty: Joi.string().valid("صعب", "سهل", "متوسط"),
  });
  return schema.validate(obj);
}

module.exports = {
  Question,
  validateCreateQuestion,
  validateUpdateQuestion,
  validateGenerateExam,
  validateIsCorrectAnswer,
  validateCreateQuestionUsingFile,
};
