const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const {
  Unit,
  validateCreateUnit,
  validateUpdateUnit,
} = require("../models/Unit");
const {Lesson} = require('../models/Lesson')
const {Question} = require('../models/Question')
const {Subject} = require('../models/Subject')

/**
 *  @desc    Create Unit
 *  @route   /api/units
 *  @method  POST
 *  @access  public
 */
module.exports.createUnitCtrl = asyncHandler(async (req, res) => {
  // Validation
  const { error } = validateCreateUnit(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const subject = await Subject.findById(req.body.subject);

  if (!subject) {
    return res.status(400).json({ message: "Subject not found" });
  }

  // Create Lesson
  const unit = await Unit.create({
    unitName: req.body.unitName,
    number: req.body.number,
    subject: req.body.subject,
    subjectName: subject.name
  });

  // Response to the client
  res
    .status(201)
    .json({ message: "The Unit has beem added successfully", unit });
});

/**
 *  @desc    Update Unit
 *  @route   /api/unit/:id
 *  @method  PUT
 *  @access  public
 */
module.exports.updateUnitCtrl = asyncHandler(async (req, res) => {
  // Validation
  const { error } = validateUpdateUnit(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Get the Unit from DB and check if post exist
  const unit = await Unit.findById(req.params.id);
  if (!unit) {
    return res.status(404).json({ message: "Unit not found" });
  }

  // Update Unit
  const updateUnit = await Unit.findByIdAndUpdate(req.params.id, {
    unitName: req.body.unitName,
    number: req.body.number,
  });

  // Response to the client
  res.status(201).json(updateUnit);
});

/**-----------------------------------------------
 * @desc    Delete Unit by id
 * @route   /api/unit/:id
 * @method  DELETE
 * @access  private (User & Admin)
 ------------------------------------------------*/
 module.exports.deleteUnitCtrl = asyncHandler(async (req, res) => {
  // Find the unit by ID
  const unit = await Unit.findById(req.params.id);
  
  if (!unit) {
    return res.status(404).json({ message: "Unit not found" });
  }
    
  // Delete all lessons associated with the unit
  const lessons = await Lesson.find({ unit: req.params.id });

  for (const lesson of lessons) {
    // Delete all questions associated with the lesson
    await Question.deleteMany({ lesson: lesson._id });
    
    // Delete the lesson itself
    await Lesson.findByIdAndDelete(lesson._id);
  }
  
  // Delete the unit itself
  await Unit.findByIdAndDelete(req.params.id);

  return res.status(200).json({ message: "Unit, associated lessons, and questions have been deleted successfully" });
});

/**-----------------------------------------------
 * @desc    Get All Units for users
 * @route   /api/units
 * @method  GET
 * @access  private (User & Admin)
 ------------------------------------------------*/
module.exports.getAllUnitCtrl = asyncHandler(async (req, res) => {
  let units, anotherUnits, documentCount;
  const { page, perPage, subjectId } = req.query;

  if (req.isMatch) {
    if (subjectId) {
      if (page && perPage) {
        units = await Unit.find({ subject: subjectId })
          .populate("lessons")
          .skip((page - 1) * perPage)
          .limit(perPage)
          .sort({ createdAt: -1 });
      } else {
        units = await Unit.find({ subject: subjectId }).populate("lessons");
      }
      anotherUnits = await Unit.find({ subject: subjectId }).populate("lessons");
      documentCount = anotherUnits.length;
    } else if (page && perPage) {
      units = await Unit.find()
        .populate("lessons")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 });
      documentCount = await Unit.countDocuments();
    } else {
      documentCount = await Unit.countDocuments();
      units = await Unit.find().populate("lessons").sort({ createdAt: -1 });
    }

    res.status(200).json({ units, totalCount: units.length, documentCount });
  } else {
    if(subjectId){
      const units = await Unit.find({ subject: subjectId }).populate("lessons");
      const unit = units.length > 0 ? units[0] : null;
      res.status(200).json({units: [unit]});
    }else{
      const units = await Unit.find().populate("lessons");
      const unit = units.length > 0 ? units[0] : null;
      res.status(200).json({units: [unit]});
    }
  }
  
});

/**-----------------------------------------------
 * @desc    Get All Units for Admins
 * @route   /api/units/Admins
 * @method  GET
 * @access  private (User & Admin)
 ------------------------------------------------*/
module.exports.getAllUnitAdminCtrl = asyncHandler(async (req, res) => {
  let units, anotherUnits, documentCount;
  const { page, perPage, subjectId } = req.query;

  if (subjectId) {
    if (page && perPage) {
      units = await Unit.find({ subject: subjectId })
        .populate("lessons")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 });
    } else {
      units = await Unit.find({ subject: subjectId }).populate("lessons");
    }
    anotherUnits = await Unit.find({ subject: subjectId }).populate("lessons");
    documentCount = anotherUnits.length;
  } else if (page && perPage) {
    units = await Unit.find()
      .populate("lessons")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    documentCount = await Unit.countDocuments();
  } else {
    documentCount = await Unit.countDocuments();
    units = await Unit.find().populate("lessons").sort({ createdAt: -1 });
  }

  res.status(200).json({ units, totalCount: units.length, documentCount });
});

/**-----------------------------------------------
 * @desc    Get Unit by Id
 * @route   /api/units/:id
 * @method  GET
 * @access  private (User & Admin)
 ------------------------------------------------*/
module.exports.getUnitsCtrl = asyncHandler(async (req, res) => {
  const unit = await Unit.findById(req.params.id).populate("lessons");

  if (!unit) {
    return res.status(404).json({ message: "unit not found" });
  }

  res.status(200).json(unit);
});
