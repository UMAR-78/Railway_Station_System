import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ChangePassword = () => {

  const navigate = useNavigate()
  const API_URL = "http://localhost:5000/api/v1";

  const dispatch = useDispatch();
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");

  const userData = JSON.parse(localStorage.getItem("user"));
  const token = userData.token;

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        API_URL + "/user/auth/changepassword",
        {
          oldPassword , 
          newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/signin");
      } else {
        // Handle failure, e.g., show an error message to the user
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };
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
