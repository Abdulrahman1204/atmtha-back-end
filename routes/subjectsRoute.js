const {
  createSubjectCtrl,
  getAllSubjectsCtrl,
  deleteSubjectCtrl,
  updateSubjectCtrl,
  getOneSubjectCtrl,
  getAllSubjectsCtrlForMobile,
} = require("../controllers/subjectsControllers");
const { verifyToken } = require("../middlewares/verifyToken");

const router = require("express").Router();
// /api/subjects
router.route("/").get(getAllSubjectsCtrl).post(createSubjectCtrl);
// /api/subjects/for-mobile
router.route("/for-mobile").get(verifyToken, getAllSubjectsCtrlForMobile)

// /api/subjects/:id
router
  .route("/:id")
  .put(updateSubjectCtrl)
  .delete(deleteSubjectCtrl)
  .get(getOneSubjectCtrl);
module.exports = router;
