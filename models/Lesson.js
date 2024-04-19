const mongoose = require('mongoose')
const Joi = require('joi')

// Lesson Schema
const LessonSchema = new mongoose.Schema({
    lessonName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100, 
    },
    unitName: {
        type: String,
        trim: true,
    },
    number: {
        type: Number,
        required: true,
        maxlength: 1, 
    },
    unit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Unit",
        required: true,
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

// Populate questions For This lesson
LessonSchema.virtual("questions", {
    ref: "Question",
    foreignField: "lesson",
    localField: "_id"
});

// Lesson Model
const Lesson = mongoose.model("Lesson", LessonSchema)

// Validate Create Lesson
function validateCreateLesson(obj) {
    const schema = Joi.object({
        lessonName: Joi.string().trim().min(2).max(100).required(),
        unitName: Joi.string().trim(),
        number: Joi.number().required(),
        unit: Joi.string().required()
    });
    return schema.validate(obj);
}

// Validate Update Lesson
function validateUpdateLesson(obj) {
    const schema = Joi.object({
        lessonName: Joi.string().trim().min(2).max(100),
        unitName: Joi.string().trim().min(2).max(100),
        number: Joi.number(),
        unit: Joi.string()
    });
    return schema.validate(obj);
}

module.exports = {
    Lesson,
    validateCreateLesson,
    validateUpdateLesson,
};
  