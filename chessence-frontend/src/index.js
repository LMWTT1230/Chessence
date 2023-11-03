import React from "react";
import ReactDOMClient from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig.js";

import ChessBoard from "./pages/ChessBoard.js"
import "./index.css";
import LoginPage from "./pages/Login/LoginPage.js";
import ProfilePage from "./pages/Profile/ProfilePage.js"
import RegisterPage from "./pages/Register/RegisterPage.js";
import RedirectPage from "./pages/Redirect/LoginRedirectPage.jsx";

// Set up MSAL
const msalInstance = new PublicClientApplication(msalConfig);
await msalInstance.initialize();

// Create the container
const container = document.getElementById("root");

// Create a root
const root = ReactDOMClient.createRoot(container);

export default function App() {
    return (
      <MsalProvider instance={msalInstance}>
        <BrowserRouter>
          <Routes>
              <Route path="/play" element={<ChessBoard />}/>
              <Route path="/login" element={<LoginPage />}/>
              <Route path="/register" element={<RegisterPage />}/>
                <Route path="/profile" element={<ProfilePage />}/>
              <Route path="/redirect" element={<RedirectPage />}/>
              {/*<Route path="*" element={<NoPage />} />*/}
          </Routes>
        </BrowserRouter>
      </MsalProvider>
    );
}

root.render(<App />);
