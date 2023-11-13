import React, { useEffect } from "react";
import { useTimer } from "react-timer-hook";

export default function MyTimer({ expiryTimestamp, turn, player }) {
    const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({
        expiryTimestamp,
        onExpire: () => console.warn("onExpire called"),
    });

    useEffect(() => {
        console.log("switch");
        if (player === turn) {
            resume();
        } else {
            pause();
        }
    }, [turn]);

    return (
        <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "40px" }}>
                <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
                <span>{seconds}</span>
                <h2>{turn}</h2>
            </div>
        </div>
    );
}
