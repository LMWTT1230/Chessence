import { useState, useRef, useEffect } from "react";
import SignUpForm from "./RegisterForm";

export default function RegisterPage() {
    return (
        <div id="registerPage">
            <h1>chessence</h1>
            <h2>sign up</h2>
            <SignUpForm/>
        </div>
    );
}