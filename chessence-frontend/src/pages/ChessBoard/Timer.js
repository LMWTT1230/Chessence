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
        let secondsToAdd = 0;

        //Grab session storage for timer value and use if it exists.
        const TimerSeconds = window.sessionStorage.getItem(
            player + "TimerSeconds"
        );
        console.log("in player " + player);
        if (TimerSeconds !== null) {
            const sessionTime = new Date();
            sessionTime.setSeconds(
                sessionTime.getSeconds() + Number(TimerSeconds)
            );
            start();
            restart(sessionTime);
        } else {
            let timeList = initTime.split(':');
            console.log(timeList);
            if(timeList.length === 2){
                if(parseInt(timeList[0]) === 0){
                    secondsToAdd = parseInt(timeList[1]);
                }
                else{
                    secondsToAdd = parseInt(timeList[0]) * 60 + parseInt(timeList[1]);
                }
                console.log("two: seconds to add: " + secondsToAdd);
            }
            else if(timeList.length === 3){
                secondsToAdd = parseInt(timeList[0]) * 3600 + parseInt(timeList[1]) * 60 + parseInt(timeList[2]);
                console.log("three: seconds to add: " + secondsToAdd);

            }
            // console.log("hours: " + hours + " minutes: " + minutes + " seconds: " + seconds);
            // if(hours)
            // if(seconds == null){
            //     console.log("seconds is null!");
            //     seconds = minutes;
            //     minutes = hours;
            //     hours = 0;
            //     console.log("hours: " + hours + " minutes: " + minutes + " seconds: " + seconds);
            //     secondsToAdd = seconds;
            //     console.log("which means seconds to add is: " + secondsToAdd);
            // }
            // else{
            //     secondsToAdd = seconds + (3600 * hours + 60 * minutes);
            // }



            // secondsToAdd = parseInt(secondsToAdd);
            time.setSeconds(time.getSeconds() + secondsToAdd);
            window.sessionStorage.setItem(player + "TimerSeconds", secondsToAdd);
            resume();
            restart(time);
        }
        if (player != turn) {
            pause();
        }
    }, []);

    //Updates session storage for each instance of the timer every second.
    useEffect(() => {
        if (initOver){
            window.sessionStorage.setItem(player + "TimerSeconds", totalSeconds);
        }
    }, [seconds, pause]);

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
            </div>
        </div>
    );
}
