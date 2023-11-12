import React, { useState } from "react";
import "./SignUp.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from 'axios'

const SignUp = () => {

  const [data,setdata] = useState(
    {
      firstName:"",
      lastName:"",
      email:"",
      password:"",
      confirmPassword:"",

    }
  )
  const onChange = (e) => {
    setdata((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }





  const onSubmit = (e)=>
  {
    e.preventDefault()

    if(data.password !== data.confirmPassword)
    {
        toast.error("Password do not match!!")
    }
  }
    return (
    <div>
      <div className="SignUpDiv">
        <div className="textField">
          <h1 className="heading_signupfrom">Sign Up</h1>
          <p>RailBooker.com</p>
        </div>

        <form onSubmit={onSubmit} className="SignUpForm">
          <div className="formRow">
            <div className="formField">
              <label>Full Name:</label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                value={data.firstName}
                onChange={onChange}
                required
              />
            </div>
          </div>

          <div className="formRow">
            <div className="formField">
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={data.lastName}
                onChange={onChange}
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div className="formRow">
            <div className="formField">
              <label>Email:</label>
              <input type="text" name="email" 
              value={data.value}
              onChange={onChange}
              required
              placeholder="abc@gmail.com" />
            </div>
          </div>

          <div className="formRow">
            <div className="formField">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={onChange}
                required
                placeholder="Enter your password.."
              />
            </div>
          </div>

          <div className="formRow">
            <div className="formField">
              <label>Confirm Password:</label>
              <input
                type="password"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={onChange}
                required
                placeholder="Enter password again.."
              />
            </div>
          </div>

          <div className="lastRow">
            <p className="lastRowText">
              Already have an account?
              <Link to = '/signin'>
              <span className="span-text"> Sign In</span>
              </Link>
            </p>
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
