const {
  getAllSideCtrl,
  createSideCtrl,
  deleteSideCtrl,
  getSideByIdCtrl
} = require("../controllers/sidesControllers");
const validateObjectId = require('../middlewares/validateObjectId')

const router = require("express").Router();
// /api/sides
router.route("/").get(getAllSideCtrl).post(createSideCtrl);

// /api/sides/:id
router.route("/:id").delete(validateObjectId, deleteSideCtrl).get(validateObjectId, getSideByIdCtrl);
module.exports = router;
