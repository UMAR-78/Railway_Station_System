import React from 'react'
import { useState } from 'react';

const UpdateProfile = () => {
  

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");


  return (
    <div>
    <div className="textField">
      <h1 className="heading_signupfrom">Upadate Profile</h1>
      <p>RailBooker.com</p>
    </div>

    <form action="" className="SignUpForm">
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
Update      </button>
    </form>
  </div>

  )
}

export default UpdateProfile