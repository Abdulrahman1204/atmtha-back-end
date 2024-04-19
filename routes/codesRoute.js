const {
  generateQrCode,
  getAllCodesCtrl,
  getOneCodeCtrl,
  deleteOneCodeCtrl,
  codeActivate,
  downloadImageCtrl,
  getAllCodesPackagesCtrl,
} = require("../controllers/codesControllers");
const { verifyToken } = require("../middlewares/verifyToken");

const router = require("express").Router();
// /api/codes
router.route("/").get(getAllCodesCtrl);
// /api/codes/packages
router.route("/packages").get(getAllCodesPackagesCtrl);
// /api/codes/:id
router.route("/:id").get(getOneCodeCtrl).delete(deleteOneCodeCtrl);
// /api/codes/generateCode
router.route("/generateCode").post(generateQrCode);
// /api/codes/code-activate
router.route("/code-activate").post(verifyToken, codeActivate);
// /api/codes/download-image
router.route("/download-image").post(downloadImageCtrl);

module.exports = router;
