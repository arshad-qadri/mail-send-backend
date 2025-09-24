const bcrypt = require("bcryptjs");
exports.hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error while hashing password" + error.message);
  }
};

exports.comparePassword = (password, hashedPassword) => {
  try {
    const isMatchedPassword = bcrypt.compare(password, hashedPassword);
    return isMatchedPassword;
  } catch (error) {
    throw new Error("Error while comparing password" + error.message);
  }
};
