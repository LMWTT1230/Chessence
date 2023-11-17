import React, { useEffect, useState } from "react"
import "./navbar.css"

export default function Navbar() {
  return (
    <nav className="navigation">
      <a href="/" className="brand-name">
        <img src={"/logo.png"} alt="Chessence" id="navLogo" />
      </a>
      <div className="navigation-menu"/*</nav>{isNavExpanded ? "navigation-menu expanded" : "navigation-menu"}*/>
        <ul>
          <li>
            <a href="/">
                <img src={"/home.png"} alt="Home" id="homeLogo" />
            </a>
          </li>
          <li>
            <a href="/start">
                <img src={"/play.png"} alt="Play" id="playLogo" />
            </a>
          </li>
          <li>
            <a href="/">
                <img src={"/social.png"} alt="Social" id="socialLogo" />
            </a>
          </li>
          <li>
            <a href="/">
                <img src={"/archive.png"} alt="Archive" id="archiveLogo" />
            </a>
          </li>
          <li>
            <a href="/login">
                <img src={"/login.png"} alt="Login" id="loginLogo" />
            </a>
          </li>
        </ul>
      </div>
    <a href="/profile" className="icon">
        <img src={"/icon.png"} alt="Icon" id="iconLogo" />
    </a>
    </nav>
  );
}