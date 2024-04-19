const router = require("express").Router();
const {
  registerUserCtrl,
  loginUserCtrl,
  loginAdminCtrl,
  registerAdminCtrl,
} = require("../controllers/authController");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

// /api/auth/register
router.post("/register", registerUserCtrl);

// /api/auth/login
router.post("/login", loginUserCtrl);

// /api/auth/login_admin
router.post("/login_admin", loginAdminCtrl);

// /api/auth/register_admin
router.post("/register_admin", registerAdminCtrl);

// /api/auth/:userId/verify/:token
// router.get("/:userId/verify/:token", verifyUserAccountCtrl);

module.exports = router;
