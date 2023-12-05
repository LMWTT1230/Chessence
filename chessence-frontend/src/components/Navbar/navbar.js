import React, { useLocation } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
    // do not render navbar on home page
    let location = useLocation();
    if (location.pathname === "/") {
        return null;
    }

    return (
        <nav className="navigation">
            <div
                className="navigation-menu" /*</nav>{isNavExpanded ? "navigation-menu expanded" : "navigation-menu"}*/
            >
                <a href="/" className="brand-name">
                    <img src={"/logo.png"} alt="Chessence" id="navLogo" />
                </a>
                <ul>
                    <li>
                        <a href="/start">
                            <img src={"/play.png"} alt="Play" id="playLogo" />
                        </a>
                    </li>
                    <li>
                        <a href="/">
                            <img
                                src={"/social.png"}
                                alt="Social"
                                id="socialLogo"
                            />
                        </a>
                    </li>
                    <li>
                        <a href="/archive">
                            <img
                                src={"/archive.png"}
                                alt="Archive"
                                id="archiveLogo"
                            />
                        </a>
                    </li>
                    <li>
                        <a href="/login">
                            <img
                                src={"/login.png"}
                                alt="Login"
                                id="loginLogo"
                            />
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
