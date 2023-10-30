import React, {useState} from 'react';
import "./register.css"

export default function RegisterForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function handleChange(event) {
        const {name, value} = event.target;
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

    function submitForm() {
        if (password != confirmPassword) {
            console.log("Password & Confirm Password Fields Do Not Match")
        } else {
            const user = 
            {
                firstName: firstName,
                lastName: lastName,
                username: username,
                email: email,
                password: password,
            };
            console.log(user);
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
                    placeholder="First Name"/>
                <p className="registerLabel">Last Name</p>
                <input
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={handleChange}
                    placeholder="Last Name"/>
                <p className="registerLabel">Username</p>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleChange}
                    placeholder="Username"/>
                <p className="registerLabel">Email</p>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Email"/>
                <p className="registerLabel">Password</p>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="Password"/>
                <p className="registerLabel">Confirm Password</p>
                <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"/>
                <div id="registerFooter">
                    <button
                        type="button"
                        id="registerSubmit"
                        onClick={submitForm}>
                        Create Account 
                    </button>
                </div>
            </form>
        </div>    
    );
}
