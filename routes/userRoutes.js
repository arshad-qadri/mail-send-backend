const express = require("express");
const { registerUser, login } = require("../controllers/userController");
const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", login);

module.exports = userRoute;
