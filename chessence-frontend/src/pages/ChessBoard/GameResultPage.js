import React from "react";
import { useLocation } from "react-router-dom";

export default function GameResultPage() {
    const { state } = useLocation();
    const { winner } = state;
    let printWinner = "";
    if (winner === "w") {
        printWinner = "White";
    } else {
        printWinner = "Black";
    }

    return (
        <div id="GameResultPage">
            <h1>Winner: {printWinner}</h1>
            <h1>Results!!</h1>
        </div>
    );
}
