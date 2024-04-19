const router = require("express").Router();
const validateObjectId = require("../middlewares/validateObjectId");
const { verifyToken } = require("../middlewares/verifyToken");
const {
  createMessageCtrl,
  getMessageCtrl,
  deleteMessageCtrl,
  GetMessageIdCtrl,
  UpdateMessageIdCtrl,
  GetMessageCtrl
} = require("../controllers/messageController");

// /api/message/send
router.route("/send").post(verifyToken, createMessageCtrl);

// /api/message
router.route("/").get(GetMessageCtrl);

// /api/message/user/:id
router.route("/user/:id").get(validateObjectId, getMessageCtrl);

// /api/message/:id
router
  .route("/:id")
  .delete(validateObjectId, deleteMessageCtrl)
  .get(validateObjectId, GetMessageIdCtrl)
  .put(validateObjectId, UpdateMessageIdCtrl);
module.exports = router;
