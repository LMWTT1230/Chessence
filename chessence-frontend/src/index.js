import React from "react";
import ReactDOMClient from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChessBoard from "./pages/ChessBoard.js";
import "./index.css";
import LoginPage from "./pages/Login/LoginPage.js";
import RegisterPage from "./pages/Register/RegisterPage.js";
import ProfilePage from "./pages/Profile/ProfilePage.js"

// Create the container
const container = document.getElementById("root");

// Create a root
const root = ReactDOMClient.createRoot(container);

export default function App() {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/play" element={<ChessBoard />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/register" element={<RegisterPage />}/>
            <Route path="/profile" element={<ProfilePage />}/>
            {/*<Route path="*" element={<NoPage />} />*/}
        </Routes>
      </BrowserRouter>
    );
}

root.render(<App />);
