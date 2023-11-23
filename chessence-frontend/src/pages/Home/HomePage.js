import React from "react";
//import { useHistory } from 'react-router-dom';
import "./home.css";

export default function HomePage() {
    /*const history = useHistory();

    const handleLogin = () => {
        history.push('/login');
    };
    
    const handleSignUp = () => {
        history.push('/register');
    };*/
    return (
        <div className="container">
            <h1>chessence</h1>
            <div className="button-container">
                <a href="/login">
                    <button className="button login-button">Login</button>
                </a>
                <p>Or</p>
                <a href="/register">
                    <button className="button signup-button">Sign Up</button>
                </a>
            </div>
        </div>
    );
}
