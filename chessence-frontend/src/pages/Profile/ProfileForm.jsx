import React, { useState } from "react";
import "./profile.css";
import axios from "axios";

export default function ProfileForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

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
        if (name === "currentPassword") {
            setCurrentPassword(value);
        }
        if (name === "newPassword") {
            setNewPassword(value);
        }
        if (name === "confirmNewPassword") {
            setConfirmNewPassword(value);
        }
    }

    async function submitForm() {
        const user = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: newPassword,
        };
        console.log(user);

        try {
            const response = await axios.put(
                "http://localhost:8000/profile",
                user
            );
            if (response.status === 200) {
                console.log("Profile updated successfully");
            } else {
                console.log("Profile update failed");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    }

    return (
        <div className="profile-container">
            <img
                id="profileImage"
                src={
                    "https://betacssjs.chesscomfiles.com/bundles/web/images/user-image.svg"
                }
            />
            <form id="profileForm">
                <p className="editLabel">edit profile</p>
                <div className="nameRow">
                    <div className="nameColumn">
                        <p className="profileLabel">First Name</p>
                        <input
                            className="profileInput"
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                        />
                    </div>
                    <div className="nameColumn">
                        <p className="profileLabel">Last Name</p>
                        <input
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                        />
                    </div>
                </div>
                <p className="profileLabel">Username</p>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleChange}
                    placeholder="Username"
                />
                <p className="profileLabel">Email</p>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                <div className="passwordColumn">
                    <p className="passwordLabel">change password</p>
                    <p className="profileLabel"> Current Password</p>
                    <input
                        type="password"
                        name="currentPassword"
                        value={currentPassword}
                        onChange={handleChange}
                        placeholder="Current Password"
                    />
                    <p className="profileLabel"> New Password</p>
                    <input
                        type="password"
                        name="newPassword"
                        value={newPassword}
                        onChange={handleChange}
                        placeholder="New Password"
                    />
                    <p className="profileLabel">Confirm New Password</p>
                    <input
                        type="password"
                        name="confirmNewPassword"
                        value={confirmNewPassword}
                        onChange={handleChange}
                        placeholder="Confirm New Password"
                    />
                </div>
                <div id="profileFooter">
                    <button
                        type="button"
                        className="button"
                        id="profileSubmit"
                        onClick={submitForm}
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
