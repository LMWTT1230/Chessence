import "./login.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/session";

export default function LoginBox() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState({
        value: "",
        showPassword: false,
    });
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();
    const forgotPasswordPath = "/ForgotPassword";
    const createAccountPath = "/register";
    const playPath = "/start";

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email.trim() === "" || password === "") {
            setPasswordError("please fill out all the required fields");
            return;
        }
        try {
            setPasswordError("");
            const res = await loginUser(email, password);
            navigate(playPath);
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
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <p className="loginLabel">Password</p>
                <input
                    type="password"
                    name="password"
                    placeholder="password"
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
