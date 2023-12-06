import React, { useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";
import "./archiveboard.css";

export default function ArchiveBoard(props) {
    const [archiveBoard, setArchiveBoard] = useState("start");
    const [turnNumber, setTurnNumber] = useState(0);

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

    const height_string = windowDimension.winHeight / 1.75 + "px";
    const width_string = windowDimension.winWidth / 1.75 + "px";

    const handlePreviousTurn = () => {
        setArchiveBoard(props.history[turnNumber - 1]);
        setTurnNumber(turnNumber - 1);
    };

    const handleNextTurn = () => {
        setArchiveBoard(props.history[turnNumber + 1]);
        setTurnNumber(turnNumber + 1);
    };

    return (
        <div
            className="archiveboard-container"
            style={{
                height: width_string,
                width: height_string,
            }}
        >
            <Chessboard
                id="archiveboard"
                position={archiveBoard}
                arePiecesDraggable={false}
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
            <div id="boardFooter">
                <button
                    className="arrow"
                    onClick={handlePreviousTurn}
                    disabled={turnNumber === 0}
                >
                    <HiArrowSmLeft />
                </button>
                <button
                    className="arrow"
                    onClick={handleNextTurn}
                    disabled={turnNumber === props.history.length - 1}
                >
                    <HiArrowSmRight />
                </button>
            </div>
        </div>
    );
}
