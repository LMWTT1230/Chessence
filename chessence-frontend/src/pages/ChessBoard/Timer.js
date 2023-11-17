import React, { useState, useEffect } from "react";
import { useTimer } from "react-timer-hook";

export default function MyTimer({ initTime, onExpire, expiryTimestamp, turn, player }) {
    const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        days,
        start,
        pause,
        resume,
        restart,
    } = useTimer({
        expiryTimestamp,
        onExpire,
    });

    const [initOver, setInitOver] = useState(false);

    //Timer initialization. Runs only once per instance of a timer.
    useEffect(() => {
        let time = new Date();
        // console.log("time seconds before: " + time.getSeconds());
        // console.log(time.getSeconds());
        let [hours, minutes, seconds] = initTime.split(':');
        let secondsToAdd = 0;
        if(seconds == null){
            // console.log("enter")
            seconds = minutes;
            minutes = hours;
            hours = 0;
            secondsToAdd = seconds + (60 * minutes);
            // console.log("seconds to add: ")
            // console.log(secondsToAdd)

            // time.setSeconds(time.getSeconds() + secondsToAdd);
        }
        else{
            secondsToAdd = seconds + (3600 * hours + 60 * minutes);
            // console.log("seconds to add: ");
            // console.log(secondsToAdd)
            // time.setSeconds(time.getSeconds() + secondsToAdd);
        }

        // console.log("time seconds after: " + time.getSeconds());
        // console.log(time.getSeconds());
        secondsToAdd = parseInt(secondsToAdd);
        console.log("seconds to add: " + secondsToAdd);




        time.setSeconds(time.getSeconds() + secondsToAdd); // 10 minutes timer

        //Grab session storage for timer value and use if it exists.
        const TimerSeconds = window.sessionStorage.getItem(
            player + "TimerSeconds"
        );
        if (TimerSeconds !== null) {
            const sessionTime = new Date();
            sessionTime.setSeconds(
                sessionTime.getSeconds() + Number(TimerSeconds)
            );
            time = sessionTime;
            start();
            restart(time);
        } else {
            resume();
            restart(time);
        }
        if (player != turn) {
            pause();
        }
    }, []);

    //Updates session storage for each instance of the timer every second.
    useEffect(() => {
        window.sessionStorage.setItem(player + "TimerSeconds", totalSeconds);
    }, [seconds]);

    //Logic for pausing/starting an instance of a timer when the turn switches.
    useEffect(() => {
        if (initOver) {
            if (player === turn) {
                resume();
            } else {
                pause();
            }
        } else {
            setInitOver(true);
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
