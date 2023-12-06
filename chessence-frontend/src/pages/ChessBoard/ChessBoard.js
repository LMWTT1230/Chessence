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
    const [fen, setFen] = useState(game_fen);
    const navigate = useNavigate(); // Get the history object for navigation

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
        //if (getTurnState !== null) setTurn(getTurnState);
    }, []);

    useEffect(() => {
        window.sessionStorage.setItem("fenState", fen);
        window.sessionStorage.setItem("turnState", props.serverChess.turn());
    }, [fen]);

    useEffect(() => {
        if (props.serverChess.isGameOver()) {
            endGame(props.serverChess.turn());
        }
    }, [props.serverChess]);

    function onDrop(sourceSquare, targetSquare) {
        const move = {
            from: sourceSquare,
            to: targetSquare,
            promotion: "q", // always promote to a queen for example simplicity
        };
        props.sendMove(move);
        try {
            const newChess = new Chess(fen);
            newChess.move(move);
            const newFen = newChess.fen();
            if (newChess.isGameOver()) {
                endGame(props.serverChess.turn());
            }
            setFen(newFen); // Update the state with the new FEN
            const newTurn = newChess.turn();
            // setTurn(newTurn);
        } catch (error) {
            console.log("Illegal move.");
        }
    }

    function endGame(winnerColor) {
        sessionStorage.clear();
        navigate("/results", { state: { winner: winnerColor } }); // Navigate to the "/results" route
    }

    function onTimerExpire() {
        if (props.serverChess.turn() === "w") {
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
                        position={props.serverChess.fen()}
                        onPieceDrop={onDrop}
                        boardOrientation={
                            props.color === "b" ? "black" : "white"
                        }
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
                <div
                    id={props.color === "b" ? "white-score" : "black-score"}
                    className="scoreboard"
                >
                    <MyTimer
                        initTime={props.initTime}
                        onExpire={onTimerExpire}
                        turn={props.serverChess.turn()}
                        player={props.color === "w" ? "b" : "w"}
                    />
                </div>
                <ScoreboardComponent
                    this={props.color}
                    turn={props.serverChess.turn()}
                />
                <div
                    id={props.color === "w" ? "white-score" : "black-score"}
                    className="scoreboard"
                >
                    <MyTimer
                        initTime={props.initTime}
                        onExpire={onTimerExpire}
                        turn={props.serverChess.turn()}
                        player={props.color}
                    />
                </div>
            </div>
        </div>
    );
}
