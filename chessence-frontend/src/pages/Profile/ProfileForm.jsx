import React, { useState } from "react";
import "./profile.css";
import axios from "axios";

export default function ProfileForm(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
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
        if (confirmNewPassword != newPassword) {
            setError(
                "New password and confirm new password inputs are different."
            );
            return;
        }
        if (newPassword === currentPassword) {
            setError("Cannot update password to your current password.");
            return;
        }
        const user = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            oldPwd: currentPassword,
            password: newPassword,
        };
        const userID = props.userId.userId;

        //call backend to update profile
        try {
            const response = await axios.put(
                `http://localhost:8000/profile/${userID}`,
                user
            );
            if (response.status === 200) {
                setError("");
                setSuccess("Profile updated successfully!");
            } else {
                setSuccess("");
                setError("Profile update failed.");
            }
        } catch (error) {
            setSuccess("");
            setError(
                "Error updating profile. Check input data, and ensure current password is correct."
            );
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
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}
            </form>
        </div>
    );
}
