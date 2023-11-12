import React from "react";
import "./SignIn.css";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
const SignUp = () => {
  return (
    <div>
      <div className="SignUpDiv">
        <div className="textField">
          <h1 className="heading_signupfrom">Sign In</h1>
          <p>RailBooker.com</p>
        </div>

        <form action="" className="SignUpForm">
          <div className="formRow">
            <div className="formField">
              <label>Email:</label>
              <input type="text" name="from" placeholder="abc@gmail.com" />
            </div>
          </div>

          <div className="formRow">
            <div className="formField">
              <label>Password:</label>
              <input
                type="password"
                name="from"
                placeholder="Enter your password.."
              />
            </div>
          </div>

          <div className="lastRow">
            <p className="lastRowText">
              Create new account.
              <Link to = '/signup'> 
              <span className="span-text"> Sign Up</span>
              </Link>
            </p>
            <p className="ForgetPasswordText">Forget Password?</p>
          </div>


          <button className="SignInbutton" type="submit">
            Sign In
          </button>

          
          
          <div className="continueWithGoogle">
            <p>Or</p>
            <div className="lkkjj">
              <p>Continue with google</p>
              <FcGoogle />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
