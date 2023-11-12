import { useState, useRef, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import LoginBox from "./LoginBox";
import { loginRequest } from '../../authConfig';

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
  return (
    <div id="loginPage">
        <h1>chessence</h1>
        <LoginBox/>
        <img src="/msft-login.svg" onClick={redir} />
    </div>
  );
}
