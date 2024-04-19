const asyncHandler = require("express-async-handler");
const {
  Subject,
  validateCreateSubject,
  validateUpdateSubject,
} = require("../models/Subject");
const { Side } = require("../models/Side");
const {Unit} = require('../models/Unit')
const {Lesson} = require('../models/Lesson')
const {Question} = require('../models/Question');
const { User } = require("../models/User");

/**-----------------------------------------------
 * @desc    Get All Subjects
 * @route   /api/subjects 
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getAllSubjectsCtrl = asyncHandler(async (req, res) => {
  let subjects, anotherSubjects, documentCount;
  const { page, perPage, sideId } = req.query;

  if (sideId) {
    if (page && perPage) {
      subjects = await Subject.find({ side: sideId })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 })
        .populate("units");
    } else {
      subjects = await Subject.find({ side: sideId }).populate("units");
    }
    anotherSubjects = await Subject.find({ side: sideId }).populate("units");
    documentCount = anotherSubjects.length;
  } else if (page && perPage) {
    subjects = await Subject.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 })
      .populate("units");
    documentCount = await Subject.countDocuments();
  } else {
    documentCount = await Subject.countDocuments();
    subjects = await Subject.find().sort({ createdAt: -1 }).populate("units");
  }

  // const documentCount = (await Subject.countDocuments()) - subjects.length;
  res
    .status(200)
    .json({ subjects, totalCount: subjects.length, documentCount });
});

/**-----------------------------------------------
 * @desc    Get All Subjects For Mobile
 * @route   /api/subjects/for-mobile
 * @method  GET
 * @access  public
 ------------------------------------------------*/
 module.exports.getAllSubjectsCtrlForMobile = asyncHandler(async (req, res) => {
  let subjects;
  const user = await User.findById(req.user.id)
  const sideId = user.chooseSide;

  if(sideId){
    subjects = await Subject.find({side:sideId}).populate("units");
  }else {
    subjects = await Subject.find().populate("units");
  }

  const documentCount = await Subject.find()

  res
    .status(200)
    .json({ subjects, totalCount: subjects.length, documentCount:documentCount.length });
});

/**-----------------------------------------------
 * @desc    Get One Subject
 * @route   /api/subjects/:id
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getOneSubjectCtrl = asyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id).populate("units");

  if (!subject) {
    return res.status(404).json({ message: "Subject not found" });
  }

  res.status(200).json(subject);
});

/**-----------------------------------------------
 * @desc    Create One Subject
 * @route   /api/subjects
 * @method  POST
 * @access  public
 ------------------------------------------------*/

module.exports.createSubjectCtrl = asyncHandler(async (req, res) => {
  const { error } = validateCreateSubject(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const exist = await Subject.findOne({ name: req.body.name });
  if (exist) {
    return res.status(400).json({ message: "this subject already exist" });
  }
  const all = req.body.side;
  const sideName = await Side.findById(req.body.side);

  const subject = new Subject({
    name: req.body.name,
    side: req.body.side,
    sideName: all.length > 1 ? "مشترك" : sideName.name,
    questionDuration: req.body.questionDuration,
  });
  await subject.save();
  res.status(200).json({ message: "subject has been created successfully" });
});

/**-----------------------------------------------
 * @desc    Delete One Subject
 * @route   /api/subjects/:id
 * @method  Delete
 * @access  public
 ------------------------------------------------*/

module.exports.deleteSubjectCtrl = asyncHandler(async (req, res) => {
  // Find the subject by ID
  const subject = await Subject.findById(req.params.id);
  
  if (!subject) {
    return res.status(404).json({ message: "Subject not found" });
  }

  // Find all units related to the subject
  const units = await Unit.find({ subject: req.params.id });

  for (const unit of units) {
    // Find all lessons related to the unit
    const lessons = await Lesson.find({ unit: unit._id });

    for (const lesson of lessons) {
      // Delete questions related to each lesson
      await Question.deleteMany({ lesson: lesson._id });
      
      // Delete the lesson itself
      await Lesson.findByIdAndDelete(lesson._id);
    }

    // Delete the unit itself
    await Unit.findByIdAndDelete(unit._id);
  }

  // Delete the subject itself
  await Subject.findByIdAndDelete(req.params.id);

  return res.status(200).json({ message: "Subject, units, lessons, and questions have been deleted successfully" });
});
/**-----------------------------------------------
 * @desc    Update Subject
 * @route   /api/subjects/:id
 * @method  PUT
 * @access  public
 ------------------------------------------------*/
module.exports.updateSubjectCtrl = asyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  if (!subject) {
    return res.status(404).json({ message: "subject not found" });
  }

  const { error } = validateUpdateSubject(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const side = await Side.findById(req.body.side);

  const updatedSubject = await Subject.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        side: req.body.side,
        questionDuration: req.body.questionDuration,
        sideName: side?.name,
      },
    },
    { new: true }
  );

  res.status(200).json(updatedSubject);
});
