const multer = require("multer");
const path = require("path");

// Use memory storage instead of disk storage
const storage = multer.memoryStorage();

// File type validation: only allow PDFs
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext !== ".pdf") {
    return cb(new Error("Only PDF files are allowed"), false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
