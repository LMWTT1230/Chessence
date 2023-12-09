import React, { useState } from "react";
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
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ProtectedGame from "./components/ProtectedGame.jsx";

// Set up MSAL
const msalInstance = new PublicClientApplication(msalConfig);
await msalInstance.initialize();

// Create the container
const container = document.getElementById("root");

// Create a root
const root = ReactDOMClient.createRoot(container);

export default function App() {
    const [userId, setId] = useSessionStorage("userId", 0);
    const [isLoggedIn, setIsLoggedIn] = useSessionStorage("isLoggedIn", false);
    const [isInGame, setIsInGame] = useSessionStorage("isInGame", false);

    // Sets userID for communication across frontend pages
    function setUserID(user) {
        setId(user);
        //console.log("index.js: ", userId);
    }

    function updateStatus(status) {
        //console.log("isLoggedIn before: ", isLoggedIn);
        setIsLoggedIn(status);
        //console.log("isLoggedIn after: ", isLoggedIn);
    }

    function updateInGame(status) {
        console.log("isInGame before: ", isInGame);
        setIsInGame(status);
        console.log("isInGame after: ", isInGame);
    }

    return (
        <MsalProvider instance={msalInstance}>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                        path="/login"
                        element={
                            <LoginPage userId={userId} setId={setUserID} updateStatus={updateStatus}/>
                        }
                    />
                    <Route element={<ProtectedRoute isLoggedIn={isLoggedIn}/>}>
                        <Route path="/start" element={<GameStartPage updateInGame={updateInGame}/>} />
                        <Route
                            path="/profile"
                            element={<ProfilePage userId={userId} />}
                        />
                        <Route path="/redirect" element={<RedirectPage />} />
                        <Route element={<ProtectedGame isInGame={isInGame}/>}>
                            <Route path="/play" element={<GamePage />} />
                            <Route path="/results" element={<GameResultPage />} />
                        </Route>
                        <Route path="/archive" element={<ArchivePage />} />
                    </Route>
                    {/*<Route path="*" element={<NoPage />} />*/}
                </Routes>
            </BrowserRouter>
        </MsalProvider>
    );
}

root.render(<App />);
