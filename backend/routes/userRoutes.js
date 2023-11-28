const express = require("express");
const Router = express.Router();

const {
  RegisterUser,
  aunthenticateUser,
  getMe,
  changePassword,
  changeProfile,
  ForgetPassword,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// Register user
Router.post("/user", RegisterUser);
// Login user
Router.post("/user/auth", aunthenticateUser);
// getMyProfile
Router.get("/user/me", protect, getMe);

// Change password
Router.put("/user/auth/changepassword", protect, changePassword);
// Update profile
Router.put("/user/auth/changeprofile", protect, changeProfile);
// Forget password
Router.post("/forgetPassword", ForgetPassword);

module.exports = Router;
