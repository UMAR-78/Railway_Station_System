import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ResetPassword = () => {

    const[password , setPassword] = useState('');

    const params = useParams('')
    console.log(params.token)


  return (
    <div>
      <div className="textField">
        <h1 className="heading_signupfrom">Reset Password</h1>
        <p>RailBooker.com</p>
      </div>

      <form action="" className="SignUpForm">
        <div className="formRow">
          <div className="formField">
            <label>New Password:</label>
            <input type="password" name="from" placeholder="New Password" value={password} onChange={e=> setPassword(e.target.value)} />
          </div>
        </div>
        <button className="SignInbutton" type="submit">
            Update Password
          </button>     

      </form>
     
    </div>
  );
};

export default ResetPassword;
