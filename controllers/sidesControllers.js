const asyncHandler = require("express-async-handler");
const { Side, validateCreateSide } = require("../models/Side");
const {Subject} = require('../models/Subject')
const {Unit} = require('../models/Unit')
const {Lesson} = require('../models/Lesson')
const {Question} = require('../models/Question')
/**-----------------------------------------------
 * @desc    Get All Side
 * @route   /api/sides
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getAllSideCtrl = asyncHandler(async (req, res) => {
  const side = await Side.find()
  const documentCount = await Side.countDocuments();
  const totalCount = await Side.countDocuments();
  res.status(200).json({ side, totalCount, documentCount });
});

/**-----------------------------------------------
 * @desc    Create One Side
 * @route   /api/sides
 * @method  POST
 * @access  public
 ------------------------------------------------*/

module.exports.createSideCtrl = asyncHandler(async (req, res) => {
  const { error } = validateCreateSide(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const exist = await Side.findOne({ name: req.body.name });
  if (exist) {
    return res.status(400).json({ message: "this side already exist" });
  }

  const side = new Side({
    name: req.body.name,
  });
  await side.save();
  res.status(200).json({ message: "side has been created successfully" });
});

/**-----------------------------------------------
 * @desc    Get Side by id
 * @route   /api/sides/:id
 * @method  POST
 * @access  public
 ------------------------------------------------*/

 module.exports.getSideByIdCtrl = asyncHandler(async (req, res) => {
  const side = await Side.findById(req.params.id).populate("subjects");

  res.status(200).json({ side });
});


/**-----------------------------------------------
 * @desc    Delete One Side
 * @route   /api/sides/:id
 * @method  GET
 * @access  public
 ------------------------------------------------*/

 module.exports.deleteSideCtrl = asyncHandler(async (req, res) => {
  // Find and delete the side by ID
  const side = await Side.findById(req.params.id);
  
  if (!side) {
    return res.status(404).json({ message: "Side not found" });
  }
  
  // Find and delete the subject associated with the side
  const subject = await Subject.findOne({ side: side._id });

  if (subject) {
    // Find and delete the units associated with the subject
    const units = await Unit.find({ subject: subject._id });

    for (const unit of units) {
      // Find and delete the lessons associated with the unit
      const lessons = await Lesson.find({ unit: unit._id });

      for (const lesson of lessons) {
        // Delete the questions associated with the lesson
        await Question.deleteMany({ lesson: lesson._id });
        
        // Delete the lesson
        await Lesson.findByIdAndDelete(lesson._id);
      }

      // Delete the unit
      await Unit.findByIdAndDelete(unit._id);
    }

    // Delete the subject
    await Subject.findByIdAndDelete(subject._id);
  }
  
  // Delete the side itself
  await Side.findByIdAndDelete(req.params.id);

  return res.status(200).json({ message: "Side, subject, units, lessons, and questions have been deleted successfully" });
});