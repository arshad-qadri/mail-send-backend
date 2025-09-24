const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const emailRoutes = require("./routes/emailRoutes");

// Load environment variables
dotenv.config();
const connectDB = require("./config/db");
const userRoute = require("./routes/userRoutes");

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// for test
app.get("/", (req, res) => {
  res.send({ message: "Welcome!" });
});
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/email", emailRoutes);
app.use("/api/user", userRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
