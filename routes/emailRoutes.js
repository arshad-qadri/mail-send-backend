const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const { sendEmail } = require("../controllers/emailController");
const upload = require("../middlewares/upload");

router.post("/send-email", authMiddleware, upload.single("resume"), sendEmail);

module.exports = router;
