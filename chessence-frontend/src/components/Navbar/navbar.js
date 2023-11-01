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

import { useState } from "react"
import "./navbar.css"
// import logoImage from "../../public/logo.png";
// import homeImage from "../../public/home.png";
// import iconImage from "../../public/icon.png";
// import archiveImage from "../../public/archive.png";
// import loginImage from "../../public/login.png";
// import playImage from "../../public/play.png";
// import socialImage from "../../public/social.png";

//<img src={"url{logo.png"} alt="Logo" />

export default function Navbar() {
    const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <nav className="navigation">
      <a href="/" className="brand-name">
        Chessence
      </a>
      <div className={isNavExpanded ? "navigation-menu expanded" : "navigation-menu"}>
        <ul>
          <li>
            <a href="/">
                Logo
            </a>
          </li>
          <li>
            <a href="/">
                Home
            </a>
          </li>
          <li>
            <a href="/play">
                Play
            </a>
          </li>
          <li>
            <a href="/">
                Social
            </a>
          </li>
          <li>
            <a href="/">
                Archive
            </a>
          </li>
          <li>
            <a href="/login">
                Login
            </a>
          </li>
        </ul>
      </div>
    <a href="/" className="icon">
        Icon
    </a>
    </nav>
  );
}