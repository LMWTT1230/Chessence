import React from 'react';
import "./gameEntry.css";

export default function GameEntry(props) {

    return (
        <div className="gameEntry" onClick={() => {props.onClick(props.gameId)}}>
            <p>{props.score}</p>
            <p>{props.player1} - {props.player2}</p>
            <p>{props.date}</p>
        </div>
    );
}