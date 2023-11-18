import React, { useState } from "react";
import "./Contact.css";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div>
      <div className="SignUpDiv">
        <div className="textField">
          <h1 className="heading_signupfrom">Contact Us</h1>
          <p>RailBooker.com</p>
        </div>

        <form className="SignUpForm">
          <div className="formRow">
            <div className="formField">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                placeholder="ABC"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="formRow">
            <div className="formField">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="abc@gmail.com"
              />
            </div>
          </div>

          <div className="formRow">
            <div className="formField">
              <label>Message</label>

              <textarea
                className="messageInput"  type="text" name="message" value=
                {message}
                onChange={(e) => setMessage(e.target.value)}
                required placeholder="Your message"
              />
            </div>
          </div>
          <button className="SignInbutton" type="submit">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
