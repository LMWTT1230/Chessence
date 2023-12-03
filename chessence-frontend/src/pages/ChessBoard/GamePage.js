import React, { useEffect } from "react";
import Board from "./ChessBoard.js";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";

export default function GamePage() {
    // connect to socket
    useEffect(() => {
        const socket = io("http://localhost:4000"); // CHANGE TO EMPTY IN DEPLOYMENT
    }, []);

    const { state } = useLocation();
    const { time } = state;
    return <Board initTime={time} />;
}
