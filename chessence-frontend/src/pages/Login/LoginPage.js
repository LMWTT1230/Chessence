import { useState, useRef, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import LoginBox from "./LoginBox";
import { loginRequest } from '../../authConfig';
import { isAuthenticated, logoutUser } from "../../api/session";

export default function LoginPage() {
    const { instance, accounts, inProgress } = useMsal();
    const redir = async () => {
        try {
            const loginResponse = await instance.loginRedirect(loginRequest);
        } catch (err) {
            // handle error
            console.log(err);
        }
    };

    // check if user is logged in
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const res = await isAuthenticated();
            setLoggedIn(res);
        };
        fetchData().catch(console.error);
    });
    const logout = async () => {
        const res = await logoutUser();
        console.log(res);
        setLoggedIn(false);
    };

    function LoginContent() {
        if (loggedIn) {
            return (
                <div>
                    <p>Already Logged In</p>
                    <button onClick={logout}>Log Out</button>
                </div>
            );
        } else {
            return (
                <>
                    <LoginBox />
                    <img src="/msft-login.svg" onClick={redir} />
                </>
            );
        }
    }
    return (
        <div id="loginPage">
            <h1>chessence</h1>
            <LoginContent loggedIn={loggedIn} />
        </div>
    );

}
