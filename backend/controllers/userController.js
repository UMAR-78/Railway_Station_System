const User = require("../models/userModel");

const RegisterUser = async (req, res) => {
  const { Name, email, password, role } = req.body;

  if (!Name || !email || !password || !role) {
    return res.status(404).json({
      success: false,
      message: "Please enter all fields!!!",
    });
  }
  // check if user already exists
  const userExits = await User.find({ email });

  if (userExits) {
    return res.status(401).json({
      message: "User already exists!!",
    });
  }
  
  try {
    const user = await User.create(req.body);
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  RegisterUser,
};
