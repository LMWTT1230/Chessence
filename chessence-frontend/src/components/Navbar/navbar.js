// import React from 'react';
// import { Link } from "react-router-dom";
// import "./navbar.css"

// const Navbar= () =>{
//     return(
//         <div>
//             <li>
//                 <Link to = "/">Logo</Link>
//             </li>
//             <li>
//                 <Link to = "/">Home</Link>
//             </li>
//             <li>
//                 <Link to = "/play">Play</Link>
//             </li>
//             <li>
//                 <Link to = "/">Social</Link>
//             </li>
//             <li>
//                 <Link to = "/">Archive</Link>
//             </li>
//             <li>
//                 <Link to = "/login">Login</Link>
//             </li>
//         </div>
//     );
// }

// export default Navbar;

import React, { useEffect, useState } from "react"
import "./navbar.css"

export default function Navbar() {
  useEffect (() => {
    const imgElement = document.querySelector('img[alt="Chessence"]');
      imgElement.width = 72;
      imgElement.height = 72;
    }, []);
  useEffect (() => {
    const imgElement = document.querySelector('img[alt="Home"]');
      imgElement.width = 36;
      imgElement.height = 36;
    }, []);
  useEffect (() => {
    const imgElement = document.querySelector('img[alt="Play"]');
      imgElement.width = 36;
      imgElement.height = 24;
    }, []);
  useEffect (() => {
    const imgElement = document.querySelector('img[alt="Social"]');
      imgElement.width = 36;
      imgElement.height = 27;
    }, []);
  useEffect (() => {
    const imgElement = document.querySelector('img[alt="Archive"]');
      imgElement.width = 36;
      imgElement.height = 36;
    }, []);
  useEffect (() => {
    const imgElement = document.querySelector('img[alt="Login"]');
      imgElement.width = 36;
      imgElement.height = 36;
    }, []);
  useEffect (() => {
    const imgElement = document.querySelector('img[alt="Icon"]');
      imgElement.width = 48;
      imgElement.height = 48;
    }, []);
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <nav className="navigation">
      <a href="/" className="brand-name">
        <img src={"/logo.png"} alt="Chessence" />
      </a>
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded)
        }}
      >
      </button>
      <div className={isNavExpanded ? "navigation-menu expanded" : "navigation-menu"}>
        <ul>
          <li>
            <a href="/">
                <img src={"/home.png"} alt="Home" />
            </a>
          </li>
          <li>
            <a href="/play">
                <img src={"/play.png"} alt="Play" />
            </a>
          </li>
          <li>
            <a href="/">
                <img src={"/social.png"} alt="Social" />
            </a>
          </li>
          <li>
            <a href="/">
                <img src={"/archive.png"} alt="Archive" />
            </a>
          </li>
          <li>
            <a href="/login">
                <img src={"/login.png"} alt="Login" />
            </a>
          </li>
        </ul>
      </div>
    <a href="/" className="icon">
        <img src={"/icon.png"} alt="Icon" />
    </a>
    </nav>
  );
}