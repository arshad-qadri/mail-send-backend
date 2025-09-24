const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema(
  {
    to: { type: String, required: true },
    subject: { type: String },
    text: { type: String },
    sentAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EmailLog", emailSchema);
