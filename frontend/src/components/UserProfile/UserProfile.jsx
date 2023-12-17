import React from "react";
import "./UserProfile.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducers/Userreducers";
import "./UserProfile.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {

  const navigate = useNavigate()
  const userData = JSON.parse(localStorage.getItem("user"));
  const hanldelogout = () => {
    localStorage.removeItem("user");
    navigate('/signin');
  };

  return (
    <>
      <div className="profilSection">
        <div className="profileHeader">
          <h1>Profile</h1>
        </div>
        <div className="profileHeaderParent">
          <div className="profileFields">
            <h4>Name: </h4>
            <span>
              {userData.firstName} {userData.lastName}{" "}
            </span>
          </div>

          <div className="profileFields">
            <h4>Email: </h4>
            <span> {userData.email}</span>
          </div>

          <div className="profileFields">
            <Link to="/updateProfile">
              <button className="button">Update Profile</button>
            </Link>
            <Link to="/changePassword">
              <button className="button">Change Password</button>
            </Link>
            <button className="button" onClick={hanldelogout}>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
