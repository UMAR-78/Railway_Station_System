const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendEmail } = require("../utils/sendMail");

// Register User
const RegisterUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    // console.log(firstName, lastName, email, password);

    if (!firstName || !email || !password) {
      return res.status(404).json({
        success: false,
        message: "Please enter all required fields!!",
      });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists!",
      });
    }

    // hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // console.log(hashedPassword);

    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });
    return res.status(200).json({
      success: true,
      message: "User created successfully!!",
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};

// Login User
const aunthenticateUser = async (req, res) => {
  const { email, password } = req.body;
  const validUser = await User.findOne({ email: email });
  if (validUser && (await bcrypt.compare(password, validUser.password))) {
    return res.status(200).json({
      success: true,
      message: "Welcome " + validUser.firstName,
      validUser,
      token: generateToken(validUser._id),
    });
  } else {
    res.status(400).json({
      message: "Invalid credentials!!!",
    });
  }
};
// Getme
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: user, // Use a different variable name here
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// CHANGE PASSWORD PROTECTed

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please enter both old and new passwords!",
      });
    }

    const validUser = await User.findById(req.user._id).select("+password");

    if (
      !validUser ||
      !(await bcrypt.compare(oldPassword, validUser.password))
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid old password!",
      });
    }

    // Hash the new password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password with the new hashed password
    validUser.password = hashedNewPassword;
    await validUser.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};

// change profile protected
const changeProfile = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    const validUser = await User.findById(req.user._id);

    if (firstName) {
      validUser.firstName = firstName;
    }
    if (lastName) {
      validUser.lastName = lastName;
    }
    if (email) {
      validUser.email = email;
    }

    await validUser.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};

// Forget password
const ForgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const validUser = await User.findOne({ email });

    if (!validUser) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const resetToken = await getResetToken();

    const url = `${process.env.FRONTEND_URL}/resetPassword/${resetToken} }`

    const message = `Click on the link to reset your password . ${url} . If you have not requested plese ignore.`;

    await sendEmail(validUser.email, "RailBooker.com reset password link", message);

    res.status(200).json({
      success: true,
      message: `Reset token has been send to ${validUser.email}`,
    });
  } catch (error) {}
};

//

module.exports = {
  RegisterUser,
  aunthenticateUser,
  getMe,
  changePassword,
  changeProfile,
  ForgetPassword,
};
