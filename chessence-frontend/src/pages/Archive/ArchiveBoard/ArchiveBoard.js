import React, { useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";
import "./archiveboard.css";

export default function ArchiveBoard() {
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

    const history = [
        {
            before: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
            after: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
            color: "w",
            piece: "p",
            from: "e2",
            to: "e4",
            san: "e4",
            lan: "e2e4",
            flags: "b",
        },
        {
            before: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
            after: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
            color: "b",
            piece: "p",
            from: "e7",
            to: "e5",
            san: "e5",
            lan: "e7e5",
            flags: "b",
        },
        {
            before: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
            after: "rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq - 0 2",
            color: "w",
            piece: "p",
            from: "f2",
            to: "f4",
            san: "f4",
            lan: "f2f4",
            flags: "b",
        },
        {
            before: "rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq - 0 2",
            after: "rnbqkbnr/pppp1ppp/8/8/4Pp2/8/PPPP2PP/RNBQKBNR w KQkq - 0 3",
            color: "b",
            piece: "p",
            from: "e5",
            to: "f4",
            san: "exf4",
            lan: "e5f4",
            flags: "c",
            captured: "p",
        },
    ];

    const handlePreviousTurn = () => {
        setArchiveBoard(history[turnNumber - 1].before);
        setTurnNumber(turnNumber - 1);
    };

    const handleNextTurn = () => {
        setArchiveBoard(history[turnNumber].after);
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
                    disabled={turnNumber === history.length}
                >
                    <HiArrowSmRight />
                </button>
            </div>
        </div>
    );
}
