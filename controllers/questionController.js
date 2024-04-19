const path = require("path");
const fs = require("fs");
const asyncHandler = require("express-async-handler");
const {
  Question,
  validateCreateQuestion,
  validateUpdateQuestion,
  validateCreateQuestionUsingFile,
} = require("../models/Question");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
} = require("../utils/cloudinary");
const { Lesson } = require("../models/Lesson");
const { Subject } = require("../models/Subject");
const { Unit } = require("../models/Unit");
const xlsx = require("xlsx");

/**-----------------------------------------------
 * @desc    Create New Question
 * @route   /api/questions
 * @method  POST
 * @access  private (only Admin)
 ------------------------------------------------*/
module.exports.createQuestionCtrl = asyncHandler(async (req, res) => {
  //Validation
  const { error } = validateCreateQuestion(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  let imagePath, result;
  if (req.file) {
    // Upload photo
    imagePath = path.join(__dirname, `../images/${req.file.filename}`);
    result = await cloudinaryUploadImage(imagePath);
  }

  const lesson = await Lesson.findById(req.body.lesson);
  const subject = await Subject.findById(req.body.subject);
  const unit = await Unit.findById(req.body.unit);
  // Create Quesiton
  const question = await Question.create({
    imageQuestion: {
      url: req.file ? result.secure_url : "null",
      publicId: req.file ? result.public_id : "null",
    },
    lessonName: lesson.lessonName,
    subjectName: subject.name,
    unitName: unit.unitName,
    question: req.body.question,
    aAnswer: req.body.aAnswer,
    bAnswer: req.body.bAnswer,
    cAnswer: req.body.cAnswer,
    dAnswer: req.body.dAnswer,
    correctAnswer: req.body.correctAnswer,
    lesson: req.body.lesson,
    subject: req.body.subject,
    unit: req.body.unit,
    difficulty: req.body.difficulty,
  });

  // Response to the client
  res
    .status(201)
    .json({ message: "The question has beem added successfully", question });
});

/**-----------------------------------------------
 * @desc    Update Question By Id
 * @route   /api/questions/:id
 * @method  PUT
 * @access  private (only Admin)
 ------------------------------------------------*/
module.exports.updateQuestionCtrl = asyncHandler(async (req, res) => {
  // validation
  const { error } = validateUpdateQuestion(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Get the question from DB and check if post exist
  const question = await Question.findById(req.params.id);
  if (!question) {
    return res.status(404).json({ message: "question not found" });
  }

  if (req.file) {
    console.log(question.imageQuestion.publicId);

    // Delete the old image
    if (question.imageQuestion.publicId) {
      await cloudinaryRemoveImage(question.imageQuestion.publicId);
    }

    // Upload New Photo
    const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
    const result = await cloudinaryUploadImage(imagePath);

    // Update The Image
    await Question.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          imageQuestion: {
            url: result.secure_url,
            publicId: result.public_id,
          },
        },
      },
      { new: true }
    );

    // Remvoe image from the server
    fs.unlinkSync(imagePath);
  }

  // update question
  const updateQuestion = await Question.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        numberId: req.body.numberId,
        lessonName: req.body.lessonName,
        unitName: req.body.unitName,
        question: req.body.question,
        aAnswer: req.body.aAnswer,
        bAnswer: req.body.bAnswer,
        cAnswer: req.body.cAnswer,
        dAnswer: req.body.dAnswer,
        correctAnswer: req.body.correctAnswer,
        lesson: req.body.lesson,
      },
    },
    { new: true }
  );

  // Send response to the client
  res.status(200).json(updateQuestion);
});

/**-----------------------------------------------
 * @desc    Delete Question By Id
 * @route   /api/questions/:id
 * @method  DELETE
 * @access  private (only Admin)
 ------------------------------------------------*/
module.exports.deleteQuestionCtrl = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);
  if (question) {
    await cloudinaryRemoveImage(question.imageQuestion.publicId);
    await Question.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "question has been deleted" });
  } else {
    res.status(404).json({ message: "question not found" });
  }
});

/**-----------------------------------------------
 * @desc    Delete image Question By Id
 * @route   /api/questions/image/:id
 * @method  DELETE
 * @access  private (only Admin)
 ------------------------------------------------*/
module.exports.deleteQuestionImageCtrl = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);
  if (question) {
    await cloudinaryRemoveImage(question.imageQuestion.publicId);
    res.status(200).json({ message: "question image has been deleted" });
  } else {
    res.status(404).json({ message: "question not found" });
  }
});

/**-----------------------------------------------
 * @desc    Get All Question (can use subject id or lesson id)
 * @route   /api/questions
 * @method  GET
 * @access  private (User & Admin)
 ------------------------------------------------*/
module.exports.getAllQuestionCtrl = asyncHandler(async (req, res) => {
  let questions, anotherQuestion, documentCount;
  const { page, perPage, subjectId, lessonId } = req.query;

  if (subjectId) {
    if (page && perPage) {
      questions = await Question.find({ subject: subjectId })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 });
    } else {
      questions = await Question.find({ subject: subjectId });
    }
    anotherQuestion = await Question.find({ subject: subjectId });
    documentCount = anotherQuestion.length;
  } else if (page && perPage) {
    questions = await Question.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    documentCount = await Question.countDocuments();
  } else if (lessonId) {
    if (page && perPage) {
      questions = await Question.find({ lesson: lessonId })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 });
    } else {
      questions = await Question.find({ lesson: lessonId });
    }
    anotherQuestion = await Question.find({ lesson: lessonId });
    documentCount = anotherQuestion.length;
  } else {
    documentCount = await Question.countDocuments();
    questions = await Question.find().sort({ createdAt: -1 });
  }

  res
    .status(200)
    .json({ questions, totalCount: questions.length, documentCount });
});

/**-----------------------------------------------
 * @desc    Get Question By Id
 * @route   /api/questions/:id
 * @method  GET
 * @access  private (User & Admin)
 ------------------------------------------------*/
module.exports.getQuestionByIdCtrl = asyncHandler(async (req, res) => {
  const questions = await Question.findById(req.params.id);
  res.status(200).json(questions);
});

/**-----------------------------------------------
 * @desc    Create Questions Using File
 * @route   /api/questions/upload-questions
 * @method  POST
 * @access  private (User & Admin)
 ------------------------------------------------*/

module.exports.createQuestionsUsingFile = asyncHandler(async (req, res) => {
  const { lesson, subject, unit } = req.query;
  if (!lesson || !subject || !unit) {
    return res.status(400).json({ message: "some query is missed" });
  }
  if (!req.file) {
    return res.status(400).json({ message: "excel file is missed" });
  }
  const fileBuffer = req.file.buffer;
  const workbook = xlsx.read(fileBuffer, { type: "buffer" });

  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const jsonData = xlsx.utils.sheet_to_json(sheet);

  const validQuestions = [];
  const invalidQuestions = [];

  jsonData.forEach((data, index) => {
    const { error } = validateCreateQuestionUsingFile(data);
    if (error) {
      invalidQuestions.push(data);
    } else {
      validQuestions.push(data);
    }
  });

  validQuestions.map((data) => {
    const newQuestion = new Question({
      question: data.question,
      aAnswer: data.aAnswer,
      bAnswer: data.bAnswer,
      cAnswer: data.cAnswer,
      dAnswer: data.dAnswer,
      correctAnswer: data.correctAnswer,
      difficulty: data.difficulty,
      lesson: lesson,
      unit: unit,
      subject: subject,
    });
    return newQuestion.save();
  });
  return res.status(200).json({ message: "questions uploaded successfully" });
});
