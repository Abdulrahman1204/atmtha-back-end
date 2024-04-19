const router = require("express").Router();
const {
  createCenterCtrl,
  updateCenterCtrl,
  getCentersCtrl,
  deleteCenterCtrl,
  getCenterByIdCtrl,
} = require("../controllers/centerController");
const validateObjectId = require("../middlewares/validateObjectId");

router.route("/").post(createCenterCtrl);

// /api/center
router.route("/").post(createCenterCtrl).get(getCentersCtrl);

// /api/center/:id
router
  .route("/:id")
  .put(validateObjectId, updateCenterCtrl)
  .delete(validateObjectId, deleteCenterCtrl)
  .get(getCenterByIdCtrl);

module.exports = router;
