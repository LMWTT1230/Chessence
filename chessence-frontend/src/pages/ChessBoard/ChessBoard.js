import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import "./chessboard.css"; // Import your custom CSS file
import { Chessboard } from "react-chessboard";
import ScoreboardComponent from "./Scoreboard";
import { useNavigate } from "react-router-dom";
import MyTimer from "./Timer";

export default function Game(props) {
    const chess = new Chess();
    const game_fen = chess.fen();
    const game_turn = chess.turn();
    const [fen, setFen] = useState(game_fen);
    const [turn, setTurn] = useState(game_turn);
    const navigate = useNavigate(); // Get the history object for navigation
    const [gameHistory] = useState([
        "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    ]);

    //// Window resizing ///
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

    const height_string = windowDimension.winHeight - 110 + "px"; // Convert to a string with 'px' appended

    /// GAME LOGIC ///
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
            gameHistory.push(newFen);
            if (newChess.isGameOver()) {
                endGame(turn);
            }
            setFen(newFen); // Update the state with the new FEN
            const newTurn = newChess.turn();
            setTurn(newTurn);
        } catch (error) {
            console.log("Illegal move.");
        }
    }

    function endGame(winnerColor) {
        console.log(gameHistory);
        sessionStorage.clear();
        navigate("/results", { state: { winner: winnerColor } }); // Navigate to the "/results" route
    }

    function onTimerExpire() {
        if (turn === "w") {
            endGame("b");
        } else {
            endGame("w");
        }
    }

    return (
        <div id="ChessBoardPage">
            <div
                className="board-container"
                style={{
                    paddingTop: "0px",
                    // width: height_string,
                }}
            >
                <h1>chessence</h1>
                {/* <div id="test"></div> */}
                <div
                    id="test"
                    style={{
                        // height: height_string,
                        width: height_string,
                    }}
                >
                    <Chessboard
                        id="board"
                        position={fen}
                        onPieceDrop={onDrop}
                        customBoardStyle={{
                            borderRadius: ".5rem",
                        }}
                        customDarkSquareStyle={{
                            backgroundColor: "var(--BK-green)",
                        }}
                        customLightSquareStyle={{
                            backgroundColor: "var(--BK-beige)",
                        }}
                    />
                </div>
            </div>
            <div
                id="scoreboard-container"
                style={{
                    // height: height_string,
                    height: height_string,
                }}
            >
                <div id="black-score" className="scoreboard">
                    <ScoreboardComponent this="b" turn={turn} />
                    <MyTimer
                        initTime={props.initTime}
                        onExpire={onTimerExpire}
                        turn={turn}
                        player="b"
                    />
                </div>
                <div id="chatbox"></div>
                <div id="white-score" className="scoreboard">
                    <ScoreboardComponent this="w" turn={turn} />
                    <MyTimer
                        initTime={props.initTime}
                        onExpire={onTimerExpire}
                        turn={turn}
                        player="w"
                    />
                </div>
            </div>
        </div>
    );
}
