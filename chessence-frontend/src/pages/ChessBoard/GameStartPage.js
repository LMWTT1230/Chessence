import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function GameStartPage() {
    return (
        <div id="GameStartPage">
            <h1>Game Settings</h1>
            <SettingsForm />
        </div>
    );
}

function SettingsForm() {
    const navigate = useNavigate(); // Get the history object for navigation
    const [timer, setTimer] = React.useState("0:00");
    const [roomId, setRoomId] = React.useState(
        "A" + Math.floor(Math.random() * 1000)
    );

    const onTimerChange = (event) => {
        setTimer(event.target.value);
    };
    const onRoomChange = (event) => {
        setRoomId(event.target.value);
    };

    const onBlur = (event) => {
        const value = event.target.value;
        const seconds = Math.max(0, getSecondsFromHHMMSS(value));
        const time = toHHMMSS(seconds);
        setTimer(time);
    };

    const getSecondsFromHHMMSS = (value) => {
        const [str1, str2, str3] = value.split(":");

        const val1 = Number(str1);
        const val2 = Number(str2);
        const val3 = Number(str3);

        if (!isNaN(val1) && isNaN(val2) && isNaN(val3)) {
            // seconds
            return val1;
        }

        if (!isNaN(val1) && !isNaN(val2) && isNaN(val3)) {
            // minutes * 60 + seconds
            return val1 * 60 + val2;
        }

        if (!isNaN(val1) && !isNaN(val2) && !isNaN(val3)) {
            // hours * 60 * 60 + minutes * 60 + seconds
            return val1 * 60 * 60 + val2 * 60 + val3;
        }

        return 0;
    };

    const toHHMMSS = (secs) => {
        const secNum = parseInt(secs.toString(), 10);
        const hours = Math.floor(secNum / 3600);
        const minutes = Math.floor(secNum / 60) % 60;
        const seconds = secNum % 60;

        return [hours, minutes, seconds]
            .map((val) => (val < 10 ? `0${val}` : val))
            .filter((val, index) => val !== "00" || index > 0)
            .join(":")
            .replace(/^0/, "");
    };

    function submitForm() {
        const settings = {
            time: timer,
        };
        console.log(settings);
        sessionStorage.clear();
        navigate("/play", { state: { time: timer, roomId: roomId } }); // Navigate to the "/results" route
    }

    return (
        <div className="settings-container">
            <h2>Match Timer</h2>
            <input
                className="gameSettingsInput"
                type="text"
                onChange={onTimerChange}
                onBlur={onBlur}
                value={timer}
            />
            <h2>Room Id</h2>
            <input
                className="gameSettingsInput"
                type="text"
                onChange={onRoomChange}
                value={roomId}
            />
            <div>
                <button
                    type="button"
                    className="button"
                    id="settingsSubmit"
                    onClick={submitForm}
                >
                    Save
                </button>
            </div>
        </div>
    );
}
