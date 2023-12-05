import React, { useEffect, useState } from "react";
import Board from "./ChessBoard.js";
import { Chess } from "chess.js";
import { socket } from "../../api/socket";
import { useLocation, Link } from "react-router-dom";

export default function GamePage() {
    const { state } = useLocation();
    const { time, roomId } = state;
    const [timer, setTimer] = useState(time);
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [hasSecondPlayer, setHasSecondPlayer] = useState(false);
    const [joinError, setJoinError] = useState(false);
    const [serverChess, setServerChess] = useState(undefined);
    const [color, setColor] = useState(undefined);
    /// Socket Functions ///
    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }
        function onDisconnect() {
            setIsConnected(false);
        }
        function onStart({ color, timer }) {
            setColor(color);
            setTimer(timer);
            setHasSecondPlayer(true);
        }
        function onWait() {
            setHasSecondPlayer(false);
            console.log("has " + hasSecondPlayer);
        }
        function onUpdateBoard(pgnStr) {
            let newChess = new Chess();
            newChess.loadPgn(pgnStr);
            setServerChess(newChess);
        }
        function onJoinError() {
            setJoinError(true);
        }
        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("joinError", onJoinError);
        socket.on("waiting", onWait);
        socket.on("starting", onStart);
        socket.on("updateBoard", onUpdateBoard);
        // join a room
        socket.emit("join", { roomId, time });
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
        return (
            <p>Waiting for second player to join room &apos;{roomId}&apos;</p>
        );
    } else if (joinError) {
        return (
            <p>
                Join error, room has 2 people!{" "}
                <Link to="/start">Join another room.</Link>
            </p>
        );
    } else {
        return (
            <Board
                initTime={timer}
                sendMove={sendMove}
                serverChess={serverChess}
                color={color}
            />
        );
    }
}
