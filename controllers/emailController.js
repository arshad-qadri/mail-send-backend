const fs = require("fs");
const transporter = require("../config/mailConfig");
const EmailLog = require("../models/emailModel");

const sendEmail = async (req, res) => {
  const { to, subject, text } = req.body;
  const resumeFile = req.file;

  if (!resumeFile) {
    return res.status(400).json({ message: "Resume file is required" });
  }

  if (resumeFile.mimetype !== "application/pdf") {
    return res.status(400).json({ message: "Only PDF files are allowed" });
  }

  // Determine file content source
  const attachment = {
    filename: resumeFile.originalname,
    content: resumeFile.buffer || fs.createReadStream(resumeFile.path),
    contentType: "application/pdf",
  };

  const mailOptions = {
    from: `"Arshad Qadri" <${process.env.EMAIL}>`,
    to,
    subject,
    text,
    html: `<p>${text}</p>`,
    attachments: [attachment],
  };

  try {
    await transporter.sendMail(mailOptions);

    const emailLog = new EmailLog({ to, subject, text });
    await emailLog.save();

    res.status(200).json({ message: "Email with resume sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send or log email", error });
  }
};

module.exports = { sendEmail };
