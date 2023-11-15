import React, { useState, useEffect } from "react";
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

    const [initOver, setInitOver] = useState(false);


    useEffect(() => {
        if(expiryTimestamp == null){
            console.log("NULL")

        }
        else{
            console.log("NOT NULL")
        }
    }, []);

    useEffect(() => {
        // const getTimerSeconds = window.sessionStorage.getItem(player + "TimerSeconds");
        // // const getTimerMinutes = window.sessionStorage.getItem(player + "TimerMinutes");
        // console.log("checking if old timer state exists...")
        // if (getTimerSeconds !== null) {
        //     console.log("exists. getting old timer state:");
        //     // console.log(player + " minutes: " + getTimerMinutes)
        //     console.log(player + " seconds: " + getTimerSeconds);
        //     const time = new Date();
        //     console.log(Number(getTimerSeconds));
        //     time.setSeconds(time.getSeconds() + Number(getTimerSeconds));
        //     // time.setMinutes(Number(getTimerMinutes));

        //     console.log("new timer minutes: " + time.get);
        //     console.log("new timer seconds: " + time.getSeconds());
        //     restart(time);
        //     console.log(totalSeconds);
        // }




        console.log("in player " + player + "....")
        let time = new Date();
        time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
        console.log("setting default time object to: " + time.getMinutes() + ":" + time.getSeconds());

        const TimerSeconds = window.sessionStorage.getItem(player + "TimerSeconds");
        console.log("seeing if " + player + "TimerSeconds exists...");
        if (TimerSeconds !== null){
            console.log("exists. getting old timer state:");
            // console.log(player + " minutes: " + getTimerMinutes)
            console.log(player + " seconds: " + TimerSeconds);
            const sessionTime = new Date();
            console.log(Number(TimerSeconds));
            sessionTime.setSeconds(sessionTime.getSeconds() + Number(TimerSeconds));
            time = sessionTime;
            console.log("setting time to: " + time.getMinutes() + ":" + time.getSeconds());
            start();
            restart(time);
        }
        else{
            console.log("does not exist.. setting time to: " + time.getMinutes() + ":" + time.getSeconds());
            resume();
            restart(time);
            console.log(totalSeconds);
        }

        if(expiryTimestamp == null){
            console.log("NULL2")

        }
        else{
            console.log("NOT NULL2")
        }
        if (player === turn) {
            console.log("resuming timer for " + player);
        } else {
            console.log("pausing timer for " + player);
            pause();
        }
    }, []);


    useEffect(() => {
        window.sessionStorage.setItem(player + "TimerSeconds", totalSeconds);
        // window.sessionStorage.setItem(player + "TimerMinutes", minutes);
    }, [seconds]);


    useEffect(() => {
        console.log("switch");
        if(initOver){
            console.log("switch setting turn");
            if (player === turn) {
                console.log("resuming timer for " + player);
                resume();
            } else {
                console.log("pausing timer for " + player);
                pause();
            }
        }
        else{
            console.log("switch enter");
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
