import React from "react";
import ReactDOMClient from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChessBoard from "./pages/ChessBoard.js"
import "./index.css";


// Create the container
const container = document.getElementById("root");

// Create a root
const root = ReactDOMClient.createRoot(container);

export default function App() {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/play" element={<ChessBoard />}>
            {/*<Route path="*" element={<NoPage />} />*/}
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
  
root.render(<App />);

