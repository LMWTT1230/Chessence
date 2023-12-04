import { React } from "react";
import { useSessionStorage } from "usehooks-ts";
import ReactDOMClient from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig.js";

import GamePage from "./pages/ChessBoard/GamePage.js";
import "./index.css";
import LoginPage from "./pages/Login/LoginPage.js";
import ProfilePage from "./pages/Profile/ProfilePage.js";
import RegisterPage from "./pages/Register/RegisterPage.js";
import ArchivePage from "./pages/Archive/ArchivePage.js";
import HomePage from "./pages/Home/HomePage.js";
import Navbar from "./components/Navbar/navbar.js";
import { Chess } from "chess.js";
import RedirectPage from "./pages/Redirect/LoginRedirectPage.jsx";
import axios from "axios";
import GameResultPage from "./pages/ChessBoard/GameResultPage.js";
import GameStartPage from "./pages/ChessBoard/GameStartPage.js";

// Set up MSAL
const msalInstance = new PublicClientApplication(msalConfig);
await msalInstance.initialize();

// Create the container
const container = document.getElementById("root");

// Create a root
const root = ReactDOMClient.createRoot(container);

export default function App() {
    const [userId, setId] = useSessionStorage("", 0);

    function setUserID(user) {
        setId(user);
        console.log("index.js: ", userId);
    }

    return (
        <MsalProvider instance={msalInstance}>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/play" element={<GamePage />} />
                    <Route path="/login" element={<LoginPage 
                    userId = {userId}
                    setId = {setUserID}/>} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/profile" element={<ProfilePage
                    userId = {userId} />} />
                    <Route path="/redirect" element={<RedirectPage />} />
                    <Route path="/results" element={<GameResultPage />} />
                    <Route path="/archive" element={<ArchivePage />} />
                    <Route path="/start" element={<GameStartPage />} />
                    {/*<Route path="*" element={<NoPage />} />*/}
                </Routes>
            </BrowserRouter>
        </MsalProvider>
    );
}

root.render(<App />);
