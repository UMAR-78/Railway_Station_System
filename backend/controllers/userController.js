const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

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
      _id: validUser.id,
      name: validUser.firstName + " " + validUser.lastName,
      email: validUser.email,
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
  res.status(200).json(req.user);
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  RegisterUser,
  aunthenticateUser,
  getMe
};
