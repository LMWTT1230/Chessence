import React from "react";
import Board from "./ChessBoard.js";
import { useLocation } from "react-router-dom";

export default function GamePage() {
    const { state } = useLocation();
    const { time } = state;
    return (
        <div>
            <Board initTime={time} />
        </div>
    );
}
