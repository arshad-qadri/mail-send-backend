const UserModel = require("../models/userModel");
const { verifyToken } = require("../services/jwt");

exports.authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .send({ success: false, message: "No token provided!" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).send({ success: false, message: "Unauthorized!" });
    }
    const user = await UserModel.findOne({ _id: decoded._id });
    if (!user) {
      return res.status(401).send({ success: false, message: "Unauthorized!" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
      customMessage: "Error while authorizing user!",
    });
  }
};
