const UserModel = require("../models/userModel");
const { generateToken } = require("../services/jwt");

exports.registerUser = async (req, res) => {
  try {
    const { password, name, email } = req?.body;

    if (!name || !password || !email) {
      return res
        .status(400)
        .send({ success: false, message: "All fields are required!" });
    }

    await UserModel.create({ name, email, password });

    return res
      .status(201)
      .send({ success: true, message: "User registered successfully!" });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
      customMessage: "Error while registering user!",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req?.body;
    if (!email || !password) {
      return res
        .status(400)
        .send({ success: false, message: "Email and password are required!" });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found!" });
    }
    if (user.password !== password) {
      return res
        .status(401)
        .send({ success: false, message: "Email or password is wrong!" });
    }
    console.log(user);

    const token = generateToken(
      { _id: user._id },
      process.env.JWT_SECRET,
      "1y"
    );
    return res
      .status(200)
      .send({ success: true, message: "Logged in successfully!", token });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
      customMessage: "Error while login!",
    });
  }
};
