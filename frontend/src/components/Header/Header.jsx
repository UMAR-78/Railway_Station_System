import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { LuUserCircle } from "react-icons/lu";
import { selectUser } from "../../redux/reducers/Userreducers";
import './Header.css'

const Navbar = () => {
  
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="header">
      <div className="logo">
        <Link to="/">
          <h2 className="logoText">RailBooker.com</h2>
        </Link>
      </div>

      {user ? (
        (user.role && user.role !== 'admin') ? (
          <>
            <div className="navItems">
              <ul>
                <li>
                  <Link to="/">
                    <a href="#home">Home</a>
                  </Link>
                </li>
                <li>
                  <Link to="/about">
                    <a href="#aboutus">About Us</a>
                  </Link>
                </li>
                <li>
                  <Link to="/contact">
                    <a href="#contact">Contact</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="profilebar">
              <Link to="/user/profile">
                <LuUserCircle className="profileIcon" />
              </Link>
            </div>
          </>
        ) : (
          // If user role is 'admin' or not defined
          <>
            <div className="navItems">
              <ul>
                <li>
                  <Link to="/admin/train">
                    <a href="#addtrain">Trains</a>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/stations">
                    <a href="#addstations">Stations</a>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/timetable">
                    <a href="#timetable">TimeTable</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="profilebar">
              <Link to="/user/profile">
                <LuUserCircle className="profileIcon" />
              </Link>
            </div>
          </>
        )
      ) : (
        // If no user is logged in
        <div>
          <Link to="/signin">
            <button type="button" className="button">
              {" "}
              Sign In
            </button>
          </Link>

          <Link to="/signup">
            <button type="button" className="button">
              {" "}
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
