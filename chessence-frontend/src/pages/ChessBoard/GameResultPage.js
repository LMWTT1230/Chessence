import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function GameResultPage(props) {
    const { state } = useLocation();
    const { winner } = state;
    let printWinner = "";
    if (winner === "w") {
        printWinner = "White";
    } else {
        printWinner = "Black";
    }

    useEffect(() => {
        const cleanup = () => {
            props.updateInGame(false);
        };

        window.addEventListener("beforeunload", cleanup);
        
        return () => {
            window.removeEventListener("beforeunload", cleanup);
            cleanup();
        };
    }, []);

    return (
        <div id="GameResultPage">
            <h1>Winner: {printWinner}</h1>
            <h1>Results!!</h1>
        </div>
    );
}
