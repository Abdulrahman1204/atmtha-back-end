const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const {
  Lesson,
  validateCreateLesson,
  validateUpdateLesson,
} = require("../models/Lesson");
const { Question } = require('../models/Question')
const {Unit} = require('../models/Unit')
/**
 *  @desc    Create Lesson
 *  @route   /api/lessons
 *  @method  POST
 *  @access  public
 */
module.exports.createLessonCtrl = asyncHandler(async (req, res) => {
  // Validation
  const { error } = validateCreateLesson(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const unitNameId = await Unit.findById(req.body.unit);
    if (!unitNameId) {
    return res.status(400).json({ message: "Unit not found" });
  }
  // Create Lesson
  const lesson = await Lesson.create({
    lessonName: req.body.lessonName,
    unitName: unitNameId.unitName,
    number: req.body.number,
    unit: req.body.unit,
  });

  // Response to the client
  res
    .status(201)
    .json({ message: "The lesson has beem added successfully", lesson });
});

/**
 *  @desc    Update Lesson
 *  @route   /api/lessons/:id
 *  @method  PUT
 *  @access  public
 */
module.exports.updateLessonCtrl = asyncHandler(async (req, res) => {
  // Validation
  const { error } = validateUpdateLesson(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Get the lessons from DB and check if post exist
  const lesson = await Lesson.findById(req.params.id);
  if (!lesson) {
    return res.status(404).json({ message: "lesson not found" });
  }

  // Update Lesson
  const updateLesson = await Lesson.findByIdAndUpdate(req.params.id, {
    lessonName: req.body.lessonName,
    unitName: req.body.unitName,
    number: req.body.number,
    unit: req.body.unit,
  });

  // Response to the client
  res.status(201).json(updateLesson);
});

/**-----------------------------------------------
 * @desc    Delete Lesson by id
 * @route   /api/lessons/:id
 * @method  DELETE
 * @access  private (User & Admin)
 ------------------------------------------------*/
module.exports.deleteLessonCtrl = asyncHandler(async (req, res) => {
  const lesson = await Lesson.findById(req.params.id);
  if (lesson) {
    await Question.deleteMany({lesson: req.params.id})
    await Lesson.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "lesson has been deleted" });
  } else {
    res.status(404).json({ message: "lesson not found" });
  }
});

/**-----------------------------------------------
 * @desc    Get All Lessons
 * @route   /api/lessons
 * @method  GET
 * @access  private (User & Admin)
 ------------------------------------------------*/
module.exports.getAllLessonCtrl = asyncHandler(async (req, res) => {
  let lessons, anotherLessons, documentCount;
  const { page, perPage, unitId } = req.query;

  if (unitId) {
    if (page && perPage) {
      lessons = await Lesson.find({ unit: unitId })
        .populate("questions")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 });
    } else {
      lessons = await Lesson.find({ unit: unitId }).populate("questions");
    }
    anotherLessons = await Lesson.find({ unit: unitId }).populate("questions");
    documentCount = anotherLessons.length;
  } else if (page && perPage) {
    lessons = await Lesson.find()
      .populate("questions")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    documentCount = await Lesson.countDocuments();
  } else {
    documentCount = await Lesson.countDocuments();
    lessons = await Lesson.find().populate("questions").sort({ createdAt: -1 });
  }

  res.status(200).json({ lessons, totalCount: lessons.length, documentCount });
});

/**-----------------------------------------------
 * @desc    Get Lesson by Id
 * @route   /api/lessons/:id
 * @method  GET
 * @access  private (User & Admin)
 ------------------------------------------------*/
module.exports.getLessonCtrl = asyncHandler(async (req, res) => {
  const lesson = await Lesson.findById(req.params.id).populate("questions");

  if (!lesson) {
    return res.status(404).json({ message: "lesson not found" });
  }

  res.status(200).json(lesson);
});

// const { page, perPage } = req.query;
// let lessons, documentCount
// if (page && perPage) {
//     lessons = await Lesson.find()
//       .skip((page - 1) * perPage)
//       .limit(perPage)
//       .sort({ createdAt: -1 })
//       .populate("Lesson");
//     documentCount = await Lesson.countDocuments();
// }else{
//     documentCount = await Lesson.countDocuments();
//     lessons = await Lesson.find().sort({ createdAt: -1 }).populate("questions");

// }

// res.status(200).json({lessons, totalCount: lessons.length, documentCount})
