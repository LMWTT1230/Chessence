import { useState, useRef, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import LoginBox from "./LoginBox";
import { loginRequest } from '../../authConfig';
import axios from 'axios';

export default function LoginPage() {
  const { instance, accounts, inProgress } = useMsal();
  const redir = async () => {
    try {
      const loginResponse = await instance.loginRedirect(loginRequest);
  } catch (err) {
      // handle error
      console.log(err)
  }
  }

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:8000/login", {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        console.log("Login successful");
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  }

  return (
    <div id="loginPage">
        <h1>chessence</h1>
        <LoginBox/>
        <img src="/msft-login.svg" onClick={redir} />
    </div>
  );
}
