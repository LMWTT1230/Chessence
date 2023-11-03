import React from "react";
import ReactDOMClient from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GamePage from "./pages/ChessBoard/GamePage.js"
import "./index.css";
import LoginPage from "./pages/Login/LoginPage.js";
import RegisterPage from "./pages/Register/RegisterPage.js";
import GameResultPage from "./pages/ChessBoard/GameResultPage.js";


// Create the container
const container = document.getElementById("root");

// Create a root
const root = ReactDOMClient.createRoot(container);

export default function App() {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/play" element={<GamePage />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/register" element={<RegisterPage />}/>
            <Route path="/results" element={<GameResultPage />}/>
            {/*<Route path="*" element={<NoPage />} />*/}
        </Routes>
      </BrowserRouter>
    );
  }
  
root.render(<App />);

