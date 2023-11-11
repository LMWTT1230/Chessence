import "./login.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// login function
async function loginUser(credentials) {
    return fetch("http://localhost:8000/loginTokenTest", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    }).then((data) => data.json());
}

export default function LoginBox({setToken}) {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await loginUser({
            email,
            password,
        });
        setToken(token);
        console.log(token);
    };

    return (
        <div className="login-box">
            <form id="loginForm" onSubmit={handleSubmit}>
                <p className="loginLabel">Email</p>
                <input
                    className="loginInput"
                    type="text"
                    placeholder="zuck@fb.com"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className="inputError">{emailError}</div>
                <p className="loginLabel">Password</p>
                <input
                    type="password"
                    name="password"
                    placeholder="hunter2"
                    minLength="8"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Link to={forgotPasswordPath} id="loginForgotPassword">
                    Forgot Password?
                </Link>
                <div className="inputError">{passwordError}</div>
                <div id="centeredLoginFooter">
                    <p id="loginCrown">👑</p>
                    <button type="submit" id="loginSubmit">
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
