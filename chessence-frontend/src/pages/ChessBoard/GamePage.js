import React, { useEffect, useState } from "react";
import Board from "./ChessBoard.js";
import { socket } from "../../api/socket";
import { useLocation } from "react-router-dom";

export default function GamePage() {
    const { state } = useLocation();
    const { time, roomId } = state;
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [hasSecondPlayer, setHasSecondPlayer] = useState(false);
    /// Socket Functions ///
    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }
        function onDisconnect() {
            setIsConnected(false);
        }
        function onStart() {
            setHasSecondPlayer(true);
        }
        function onWait() {
            setHasSecondPlayer(false);
            console.log("has " + hasSecondPlayer);
        }
        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("waiting", onWait);
        socket.on("starting", onStart);
        // join a room
        socket.emit("join", roomId);
        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        };
    }, []);

    // send a move to the socket
    const sendMove = (move) => {
        socket.emit("move", move);
    };
    if (!isConnected) {
        return <p>Connecting...</p>;
    } else if (!hasSecondPlayer) {
        return <p>Waiting for second player to join room {roomId}</p>;
    } else {
        return <Board initTime={time} sendMove={sendMove} />;
    }
}
