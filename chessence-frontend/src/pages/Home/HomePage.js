import React from 'react';
import './home.css';

export default function HomePage() {
  return (
    <div className="container">
      <h1>chessence</h1>
      <div className="button-container">
        <button className="button login-button">Login</button>
        <p>Or</p>
        <button className="button signup-button">Sign Up</button>
      </div>
    </div>
  );
};
