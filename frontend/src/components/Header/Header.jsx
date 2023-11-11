import React from "react";
// import "./Header.css";
import "./Header.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="header">
      <div className="logo">
        <h2>RailBooker.com</h2>
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
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </div>

      <div>
        {/* <Link to="/signin"></Link> */}
        <button  className="button"> Sign In</button>        
        <button className="button"> Sign Up</button>
      </div>
    </div>
  );
};

export default Navbar;
