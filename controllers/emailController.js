const transporter = require("../config/mailConfig");
const EmailLog = require("../models/emailModel");

const sendEmail = async (req, res) => {
  const { to, subject, text } = req.body;
  const resumeFile = req.file;

  if (!resumeFile) {
    return res.status(400).json({ message: "Resume file is required" });
  }

  const mailOptions = {
    from: `"Aq Arshad" <${process.env.EMAIL}>`,
    to,
    subject,
    text,
    html: `<p>${text}</p>`,
    attachments: [
      {
        filename: resumeFile.originalname,
        path: resumeFile.path,
        contentType: "application/pdf",
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);

    // ✅ Save log to MongoDB
    const emailLog = new EmailLog({ to, subject, text });
    await emailLog.save();

    res.status(200).json({ message: "Email with resume sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send or log email", error });
  }
};

module.exports = { sendEmail };
