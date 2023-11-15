import React, { useState } from "react";
import "./register.css";
import axios from 'axios';

export default function RegisterForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function handleChange(event) {
        const { name, value } = event.target;
        if (name === "firstName") {
            setFirstName(value);
        }
        if (name === "lastName") {
            setLastName(value);
        }
        if (name === "username") {
            setUsername(value);
        }
        if (name === "email") {
            setEmail(value);
        }
        if (name === "password") {
            setPassword(value);
        }
        if (name === "confirmPassword") {
            setConfirmPassword(value);
        }
    }

    async function submitForm() {
        if (password != confirmPassword) {
            console.log("Password & Confirm Password Fields Do Not Match");
        } else {
            const user = {
                firstName: firstName,
                lastName: lastName,
                username: username,
                email: email,
                password: password,
            };
            try {
                const response = await makePostCall(user);
                //console.log("Entire response: ", response);
                //console.log("Response data: ", response.response.data.error);
                if (response && response.data.error) {
                    //console.log("Setting error state:", response.data.error)
                    setError(response.data.error);
                    //console.log("found response error");
                }
                else if(response) {
                    //console.log("found response success");
                    setFirstName("");
                    setLastName("");
                    setUsername("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                    setError("");
                    setSuccess("Successfully registered!");
                }
            }
            catch(error) {
                console.error('Error', error);
                //console.log("Setting error state:", error)
                //setError(error.data.error);
                setSuccess("");
                setError("An error occurred during registration.");
            }
        }
            //console.log(user);
    }

    async function makePostCall(user){
        try {
            const response = await axios.post('http://localhost:8000/register', user);
            //console.log("Response from makePostCall: ", response);
            return response;
            // if (response.data && response.data.error) {
            //     setError(response.data.error);
            //     console.log("Server returned an error:", response.data.error);
            //     return response;
            // }
            // else if (response.data && response.data.success) {
            //     return response;
            // }
        }
        catch (error) {
           //console.log(error);
           setSuccess("");
           setError("An error occurred during registration.");
           //console.log("Error from makePostCall: ", error);
           return error.response;
        }
    }

    return (
        <div className="register-container">
            <form id="registerForm">
                <p className="registerLabel">First Name</p>
                <input
                    className="registerInput"
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                />
                <p className="registerLabel">Last Name</p>
                <input
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                />
                <p className="registerLabel">Username</p>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleChange}
                    placeholder="Username"
                />
                <p className="registerLabel">Email</p>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                <p className="registerLabel">Password</p>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="Password"
                />
                <p className="registerLabel">Confirm Password</p>
                <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                />
                <div id="registerFooter">
                    <button
                        type="button"
                        id="registerSubmit"
                        onClick={submitForm}
                    >
                        Create Account
                    </button>
                </div>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
}
