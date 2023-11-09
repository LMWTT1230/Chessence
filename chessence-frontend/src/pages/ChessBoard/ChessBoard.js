import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import "./chessboard.css"; // Import your custom CSS file
import { Chessboard } from "react-chessboard";
import ScoreboardComponent from "./Scoreboard";
import { useNavigate } from "react-router-dom";
import MyTimer from "./Timer";

export default function Game() {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
    const chess = new Chess();
    const game_fen = chess.fen();
    const game_turn = chess.turn();
    const [fen, setFen] = useState(game_fen);
    const [turn, setTurn] = useState(game_turn);
    const navigate = useNavigate(); // Get the history object for navigation

    useEffect(() => {
        const getFenState = window.sessionStorage.getItem("fenState");
        if (getFenState !== null) setFen(getFenState);
        const getTurnState = window.sessionStorage.getItem("turnState");
        if (getTurnState !== null) setTurn(getTurnState);
    }, []);

    useEffect(() => {
        window.sessionStorage.setItem("fenState", fen);
        window.sessionStorage.setItem("turnState", turn);
    }, [fen]);

    function onDrop(sourceSquare, targetSquare) {
        const move = {
            from: sourceSquare,
            to: targetSquare,
            promotion: "q", // always promote to a queen for example simplicity
        };

        try {
            const newChess = new Chess(fen);
            newChess.move(move);
            const newFen = newChess.fen();
            console.log("in here");
            if (newChess.isGameOver()) {
                console.log("in if");
                const playerColor = turn;
                sessionStorage.clear();
                navigate("/results", { state: { winner: playerColor } }); // Navigate to the "/results" route
            }
            setFen(newFen); // Update the state with the new FEN
            const newTurn = newChess.turn();
            setTurn(newTurn);
        } catch (error) {
            console.log("Illegal move.");
        }
    }

    const [windowDimension, detectHW] = useState({
        winWidth: window.innerWidth,
        winHeight: window.innerHeight,
    });
    const detectSize = () => {
        detectHW({
            winWidth: window.innerWidth,
            winHeight: window.innerHeight,
        });
    };
    useEffect(() => {
        window.addEventListener("resize", detectSize);

        return () => {
            window.removeEventListener("resize", detectSize);
        };
    }, []);

    const height_string = windowDimension.winHeight - 63.5 + "px"; // Convert to a string with 'px' appended

    return (
        <div id="ChessBoardPage">
            <div
                className="board-container"
                style={{
                    paddingTop: "0px",
                    height: height_string,
                    width: height_string,
                }}
            >
                <Chessboard
                    id="BasicBoard"
                    position={fen}
                    onPieceDrop={onDrop}
                />
            </div>
            <div id="scoreboard-container">
                <div id="scoreboard">
                    <ScoreboardComponent this="b" turn={turn} />
                    <MyTimer expiryTimestamp={time} turn={turn} player="b" />
                </div>
                <div id="chatbox"></div>
                <div id="scoreboard2">
                    <ScoreboardComponent this="w" turn={turn} />
                    <MyTimer expiryTimestamp={time} turn={turn} player="w" />
                </div>
            </div>
        </div>
    );
}
