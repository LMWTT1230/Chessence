
import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function GameStartPage() {
    return (
        <div id="GameStartPage">
            <h1>Game Settings</h1>
            <TimerInput/>
        </div>
    )
}


// function GameSettings() {
//     function submitForm() {
//         const user = 
//         {
//             firstName: firstName,
//             lastName: lastName,
//             username: username,
//             email: email,
//             password: newPassword,
//         };
//         console.log(user);
//     }
//             <div className="settings-container">
//                 <TimerInput/>
//             </div>

// }

function TimerInput() {
    const navigate = useNavigate(); // Get the history object for navigation
    const [value, setValue] = React.useState("0:00");
      
    const onChange = (event) => {
        setValue(event.target.value);
    };

    const onBlur = (event) => {
        const value = event.target.value;
        const seconds = Math.max(0, getSecondsFromHHMMSS(value));
        const time = toHHMMSS(seconds);
        setValue(time);
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
        const settings = 
        {
            time: value,
        };
        console.log(settings);
        sessionStorage.clear()
        navigate("/play", { state: { time : value } }); // Navigate to the "/results" route
    }

    return (
        <div className="settings-container">
            <h2>Match Timer</h2>
            <input id="timeInput"
                type="text"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
            />
            <div >
                <button
                    type="button"
                    id="settingsSubmit"
                    onClick={submitForm}>
                    Save 
                </button>
            </div>
        </div>
    );
}


///
/*
import React, {useState} from "react";
import "./profile.css";

export default function ProfileForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    function handleChange(event) {
        const {name, value} = event.target;
        if (name === "firstName") {
            setFirstName(value);
        }
        if (name === "lastName") {
            setLastName(value);
        }
        if (name === "username") {
            setUsername(value);
        }
        if (name === "email") {
            setEmail(value);
        }
        if (name === "currentPassword") {
            setCurrentPassword(value);
        }
        if (name === "newPassword") {
            setNewPassword(value);
        }
        if (name === "confirmNewPassword") {
            setConfirmNewPassword(value);
        }
    }

    function submitForm() {
        const user = 
        {
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: newPassword,
        };
        console.log(user);
    }

    return (
        <div className="profile-container">
            <img id="profileImage" 
                src={'https://betacssjs.chesscomfiles.com/bundles/web/images/user-image.svg'}/>
            <form id="profileForm">
                <p className="editLabel">edit profile</p>
                <div className="nameRow">
                    <div className="nameColumn">
                        <p className="profileLabel">First Name</p>
                        <input
                            className="profileInput"
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={handleChange}
                            placeholder="First Name"/>
                    </div>
                    <div className="nameColumn">
                        <p className="profileLabel">Last Name</p>
                        <input
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={handleChange}
                            placeholder="Last Name"/>
                    </div>
                </div>
                <p className="profileLabel">Username</p>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleChange}
                    placeholder="Username"/>
                <p className="profileLabel">Email</p>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Email"/>
                <div className="passwordColumn">
                    <p className="passwordLabel">change password</p>
                    <p className="profileLabel"> Current Password</p>
                    <input
                        type="password"
                        name="currentPassword"
                        value={currentPassword}
                        onChange={handleChange}
                        placeholder="Current Password"/>
                    <p className="profileLabel"> New Password</p>
                    <input
                        type="password"
                        name="newPassword"
                        value={newPassword}
                        onChange={handleChange}
                        placeholder="New Password"/>
                    <p className="profileLabel">Confirm New Password</p>
                    <input
                        type="password"
                        name="confirmNewPassword"
                        value={confirmNewPassword}
                        onChange={handleChange}
                        placeholder="Confirm New Password"/>
                </div>
                <div id="profileFooter">
                    <button
                        type="button"
                        id="profileSubmit"
                        onClick={submitForm}>
                        Save 
                    </button>
                </div>
            </form>
        </div>    
    );

}
*/