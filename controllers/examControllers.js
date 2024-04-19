const asyncHandler = require("express-async-handler");
const { User } = require("../models/User");
const { Subject } = require("../models/Subject");
const {
  validateCreateQuestion,
  validateGenerateExam,
  Question,
  validateIsCorrectAnswer,
} = require("../models/Question");
/**-----------------------------------------------
 * @desc    Is User Have Exam
 * @route   /api/exam/have-exam
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.haveExam = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const user = await User.findById(userId).populate("codes");

  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }
  const codes = user.codes;

  if (!codes || codes.length === 0) {
    return res.status(200).json({ hasExam: false });
  }

  // Check if any code in the array has the property isExam set to true
  const hasExam = codes.some((code) => code.isExam);

  return res.status(200).json({ hasExam: hasExam });
});

/**-----------------------------------------------
 * @desc    Generate Exam
 * @route   /api/exam/generate-exam
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.generateExam = asyncHandler(async (req, res) => {
  const { error } = validateGenerateExam(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const questions = [];

  const subject = await Subject.findById(req.body.subjectId).populate(
    "questions"
  );
  const numberOfQuestions = req.body.numberOfQuestions;

  if (!subject || !subject.questions || subject.questions.length === 0) {
    return res
      .status(404)
      .json({ message: "No questions found for the subject" });
  }

  const questionRefs = subject.questions.map((question) => question._id);

  // Calculate the number of questions for each difficulty level
  const numHard = Math.ceil((20 / 100) * numberOfQuestions);
  const numMedium = Math.ceil((20 / 100) * numberOfQuestions);
  const numEasy = numberOfQuestions - numHard - numMedium;

  // Fetch random questions for each difficulty level from the database
  const hardQuestions = await Question.aggregate([
    { $match: { _id: { $in: questionRefs }, difficulty: "صعب" } },
    { $sample: { size: numHard } },
  ]);

  const mediumQuestions = await Question.aggregate([
    { $match: { _id: { $in: questionRefs }, difficulty: "متوسط" } },
    { $sample: { size: numMedium } },
  ]);

  const easyQuestions = await Question.aggregate([
    { $match: { _id: { $in: questionRefs }, difficulty: "سهل" } },
    { $sample: { size: numEasy } },
  ]);
  // Concatenate the questions into the final array
  questions.push(...easyQuestions, ...mediumQuestions, ...hardQuestions);

  res.status(200).json({ questions: questions });
});

/**-----------------------------------------------
 * @desc    Generate Exam Result
 * @route   /api/exam/is-question-true
 * @method  POST
 * @access  public
 ------------------------------------------------*/
module.exports.isQuestionTrue = asyncHandler(async (req, res) => {
  const { error } = validateIsCorrectAnswer(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const question = await Question.findById(req.body.questionId);
  const userAnswer = req.body.correctAnswer;
  const currentAnswer = question.correctAnswer;
  const user = await User.findById(req.user.id);

  if (userAnswer === currentAnswer) {
    user.right += 1;
  } else if (userAnswer !== currentAnswer) {
    user.wrong += 1;
  }

  await user.save();
  res.status(200).json({ current: currentAnswer });
});

/**-----------------------------------------------
 * @desc    Generate Exam Result
 * @route   /api/exam/result
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.ExamResult = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  const resultOfUser = (user.right / (user.right + user.wrong)) * 100;
  res.status(200).json({
    Rights: user.right,
    Wrongs: user.wrong,
    resultOfUser,
  });
  user.right = 0;
  user.wrong = 0;
  await user.save();
});
