const express = require("express");
const router = express.Router();
const { sendEmail } = require("../controllers/emailController");
const upload = require("../middlewares/upload");

router.post("/send-email", upload.single("resume"), sendEmail);

module.exports = router;
