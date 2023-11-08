const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter your first name!!!"],
  },
  lastName: {
    type: String,
  },
  email: { type: String, required: [true, "Please enter your email!!!"] },
  password: {
    type: String,
    required: [true, "Please enter your password!!!"],
  },
},

{
  timestamps: true,
}


);

module.exports = mongoose.model("user" , userSchema)
