const jwt = require("jsonwebtoken");
exports.generateToken = (payload, jwtSecret, expiresIn = "1h") => {
  try {
    const token = jwt.sign(payload, jwtSecret, { expiresIn });
    return token;
  } catch (error) {
    throw new Error("Error while generating token: " + error.message);
  }
};
exports.verifyToken = (token, jwtSecret) => {
  try {
    const decoded = jwt.verify(token, jwtSecret);
    return decoded;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
