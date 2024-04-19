const router = require("express").Router();
const validateObjectId = require("../middlewares/validateObjectId");
const {
  createQuestionCtrl,
  getAllQuestionCtrl,
  getQuestionByIdCtrl,
  deleteQuestionCtrl,
  updateQuestionCtrl,
  deleteQuestionImageCtrl,
  createQuestionsUsingFile,
} = require("../controllers/questionController");
const photoUpload = require("../middlewares/photoUpload");
const multer = require("multer");

const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024, // Maximum file size (5MB)
    files: 1, // Allowing only 1 file
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(xlsx)$/)) {
      return cb(new Error("Only Excel files are allowed! (xlsx)"));
    }
    cb(null, true);
  },
});

// /api/question
router
  .route("/")
  .post(photoUpload.single("image"), createQuestionCtrl)
  .delete(validateObjectId, deleteQuestionCtrl)
  .get(getAllQuestionCtrl);

// /api/question/:id
router
  .route("/:id")
  .delete(validateObjectId, deleteQuestionCtrl)
  .put(validateObjectId, photoUpload.single("image"), updateQuestionCtrl)
  .get(validateObjectId, getQuestionByIdCtrl);

// /api/question/image/:id
router.route("/image/:id").delete(validateObjectId, deleteQuestionImageCtrl);

router
  .route("/upload-questions")
  .post(upload.single("file"), createQuestionsUsingFile);

module.exports = router;
