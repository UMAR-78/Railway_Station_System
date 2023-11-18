    import React, { useState } from "react";

    const ForgetPassword = () => {
        const [password , setPassword] = useState('')

        
    return (
        <div>
        <div className="textField">
            <h1 className="heading_signupfrom">Forget Password</h1>
            <p>RailBooker.com</p>
        </div>

        <form action="" className="SignUpForm">
            <div className="formRow">
            <div className="formField">
                <label>Email:</label>
                <input type="text" name="from" placeholder="abc@gmail.com" value={password} onChange={e=> setPassword(e.target.value)}/>
            </div>
            </div>
            <button className="SignInbutton" type="submit">
                Send Reset Link
            </button>     

        </form>
        
        </div>
    );
    };

    export default ForgetPassword;
