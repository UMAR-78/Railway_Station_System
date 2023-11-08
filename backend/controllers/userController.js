const User = require('../models/userModel')

const RegisterUser = async(req , res) =>
{
    const { firstName , lastName , email , password} = req.body


    if(!firstName || !email || !password)
    {
      res.status(400).json(
        {
          success:false,
          message:("Please enter all fields!!")
        }
      )
    }

    // check if user already exists

    const userExists = await User.find({email})
    if(!userExists) {
      
    }

}