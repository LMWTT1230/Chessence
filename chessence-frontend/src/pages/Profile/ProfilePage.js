import React from "react";
import SignUpForm from "./ProfileForm";

export default function ProfilePage(props) {
    return (
        <div id="profilePage">
            <h1>settings</h1>
            <SignUpForm userId = {props} />
        </div>
    );
}
