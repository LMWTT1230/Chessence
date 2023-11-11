/**
 * custom react hook for accessing login tokens
 * https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications#creating-a-custom-token-hook
 */
import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.token;
    };
    const [token, setToken] = useState(getToken());
    const saveToken = userToken => {
        localStorage.setItem("token", JSON.stringify(userToken));
        setToken(userToken.token);
    };
    return {
        setToken: saveToken,
        token,
    };
}
