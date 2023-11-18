import React from "react";
// import "./Header.css";
import "./Header.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="header">
      <div className="logo">
        <Link to="/">
          <h2 className="logoText">RailBooker.com</h2>
        </Link>
      </div>

      <div className="navItems">
        <ul>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#aboutus">About Us</a>
          </li>
          <li>
            <Link to = "/contact">
            <a href="#contact">Contact</a>
            </Link>
          </li>
        </ul>
      </div>

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
    </div>
  );
};

export default Navbar;
