import React from "react";
import ReactDOMClient from "react-dom/client";
import ChessBoard from "./ChessBoard.js"
import "./index.css";


// Create the container
const container = document.getElementById("root");

// Create a root
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the Root
root.render(<ChessBoard />);
