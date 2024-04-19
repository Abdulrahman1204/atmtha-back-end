const router = require("express").Router();

const {
  haveExam,
  generateExam,
  ExamResult,
  isQuestionTrue,
} = require("../controllers/examControllers");
const { verifyToken } = require("../middlewares/verifyToken");

// /api/exam/have-exam
router.route("/have-exam").get(verifyToken, haveExam);

// /api/exam/generate-exam
router.route("/generate-exam").post(generateExam);

// /api/exam/is-question-true
router.route("/is-question-true").post(verifyToken, isQuestionTrue);

// /api/exam/result
router.route("/result").get(verifyToken, ExamResult);
module.exports = router;
