import "./login.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginBox() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState({
        value: "",
        showPassword: false,
    });
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const forgotPasswordPath = "/ForgotPassword";
    const createAccountPath = "/register";
    const verifyAccountPath = "/VerifyAccountPage";
    
    return (
      <div className="login-box">
          <form id="loginForm">
            <p className="loginLabel">Email</p>
            <input
                className="loginInput"
                type="text"
                placeholder="zuck@fb.com"
                //onChange={}
            />
            <div className="inputError">{emailError}</div>
            <p className="loginLabel">Password</p>
            <input 
                type="password" 
                name="password" 
                placeholder="hunter2"
                minLength="8" />
            <Link to={forgotPasswordPath} id="loginForgotPassword">
                    Forgot Password?
            </Link>
            <div className="inputError">{passwordError}</div>
            <div id="centeredLoginFooter">
                <p id='loginCrown'>👑</p>
                <button type="button" id="loginSubmit" onClick={() => console.log("click")} >
                    Login
                </button>
                <Link to={createAccountPath} id="loginCreateAccount">
                    New? Create an Account Here!
                </Link>
            </div>
            
      </form>
      </div>
    );
  }