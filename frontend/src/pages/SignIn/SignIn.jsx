import React, { useState } from "react";
import "./SignIn.css";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import login from '../../redux/actions/user'
const SignIn = () => {

      const [email , setEmail] = useState('')
      const [password , setPassword] = useState('')
      const dispatch = useDispatch()
  
      const submitHandler =(e)=>
      { 
            e.preventDefault()
            dispatch(login(email, password))
            
      }
  return (




    <div>
      <div className="SignUpDiv">
        <div className="textField">
          <h1 className="heading_signupfrom">Sign In</h1>
          <p>RailBooker.com</p>
        </div>

        <form onSubmit={submitHandler} className="SignUpForm">
          <div className="formRow">
            <div className="formField">
              <label>Email:</label>
              
              <input type="text" name="email" value={email} 
                onChange={(e) => setEmail(e.target.value)} required placeholder="abc@gmail.com" />
            </div>
          </div>

          <div className="formRow">
            <div className="formField">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={password}
                required
                placeholder="Enter your password.."
                onChange={(e) => setPassword(e.target.value)}

              />
            </div>
          </div>

          <div className="lastRow">
            <p className="lastRowText">
              Create new account.
              <Link to="/signup">
                <span className="span-text"> Sign Up</span>
              </Link>
            </p>

            <Link to="/forgetpassword">
              <p className="ForgetPasswordText">Forget Password?</p>
            </Link>
          
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

export default SignIn;
