import React from "react";
import "./gameEntry.css";

export default function GameEntry(props) {
    console.log(props.player1)
    return (
        <div
            className="gameEntry"
            onClick={() => {
                props.onClick(props.gameId);
            }}
        >
            <p>{props.winner == props.player1 ? "1 - 0" : "0 - 1"}</p>
            <p>
                {props.player1} - {props.player2}
            </p>
            <p>{props.date}</p>
        </div>
    );
}
