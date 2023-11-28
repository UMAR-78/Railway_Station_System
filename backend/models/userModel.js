const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter your first name!!"],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please enter your email!!"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password!!"],
    },
    resetPasswordToken: String, // Fixed typo here (resetPasswordtoken to resetPasswordToken)
    resetPasswordExpire: String,
    role: {
      type: String,
      default: 'user', // Default role is set to 'user'
    },
  },
  {
    timestamps: true,
  }
);


userSchema.methods.getResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  // 15 minutes expiry date
  this.resetPasswordExpire = Date.now() +  15 * 60 * 1000
  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
