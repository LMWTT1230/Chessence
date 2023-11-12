import "./login.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// login function
async function loginUser(credentials) {
    const response = await axios.post(
        "http://localhost:8000/session/login",
        credentials,
        {
            // credentials: 'include',
            withCredentials: true,
        }
    );
    return response;
}

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await loginUser({
                email,
                password,
            });
            console.log(res);
            setPasswordError("");
        } catch (error) {
            if (error.response?.data?.message) {
                setPasswordError(error.response.data.message);
            } else {
                setPasswordError("Could not connect to the server");
            }
        }
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
