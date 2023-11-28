import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

const ChangePassword = () => {

    const dispatch =  useDispatch() 
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");

    const submitHandler = (e) =>
    {   e.preventDefault()
        dispatch()
    }
  return (
    <div>
      <div className="textField">
        <h1 className="heading_signupfrom">Change Password</h1>
        <p>RailBooker.com</p>
      </div>

      <form action="" className="SignUpForm" onSubmit={submitHandler}>
        <div className="formRow">
          <div className="formField">
            <input
              type="password"
              name="oldPassword"
              placeholder="Enter old password"
              value={oldPassword}
              onChange={(e) => setoldPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="formRow">
          <div className="formField">
            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setnewPassword(e.target.value)}
            />
          </div>
        </div>
        
        <button className="SignInbutton" type="submit">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
