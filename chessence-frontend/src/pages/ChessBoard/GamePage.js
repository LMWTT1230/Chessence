import React, { useEffect, useState } from "react";
import Board from "./ChessBoard.js";
import { socket } from "../../api/socket";
import { useLocation } from "react-router-dom";

export default function GamePage() {
    const { state } = useLocation();
    const { time, roomId } = state;
    const [isConnected, setIsConnected] = useState(socket.connected);
    /// Socket Functions ///
    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }
        function onDisconnect() {
            setIsConnected(false);
        }
        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        };
    }, []);

    // send a move to the socket
    const sendMove = (move) => {
        socket.emit("move", move);
    };
    socket.emit("join", roomId);

    if (isConnected) {
        return <Board initTime={time} sendMove={sendMove} />;
    } else {
        return <p>Connecting...</p>;
    }
}
