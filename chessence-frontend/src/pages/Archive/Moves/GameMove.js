import React from "react";
import React from "react";
import "./gameMove.css";

export default function GameMove(props) {
    return (
        <div id="gameMove">
            <p>{props.moves}</p>
        </div>
    );
}
