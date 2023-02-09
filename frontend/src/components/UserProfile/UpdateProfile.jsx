import React from "react";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducers/Userreducers";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const API_URL = "http://localhost:5000/api/v1";

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");

  // const user = useSelector(selectUser);
  const userData = JSON.parse(localStorage.getItem("user"));
  const token = userData.token;
  console.log(token);

  const hanldeSubmitHanlder = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        API_URL + "/user/auth/changeprofile",
        {
          firstName,
          lastName,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        const updatedUserData = {
          ...userData,
          ...(firstName && { firstName }),
          ...(lastName && { lastName }),
          ...(email && { email }),
        };
        localStorage.setItem("user", JSON.stringify(updatedUserData));

        navigate("/user/profile");
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
        <h1 className="heading_signupfrom">Upadate Profile</h1>
        <p>RailBooker.com</p>
      </div>

      <form onSubmit={hanldeSubmitHanlder} className="SignUpForm">
        <div className="formRow">
          <div className="formField">
            <input
              type="text"
              name="firstName"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
            />
          </div>
        </div>
        <div className="formRow">
          <div className="formField">
            <input
              type="text"
              name="lastName"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
            />
          </div>
        </div>

        <div className="formRow">
          <div className="formField">
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <button className="SignInbutton" type="submit">
          Update{" "}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
