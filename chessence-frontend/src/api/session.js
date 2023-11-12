import axios from "axios";

const endpoint = "http://localhost:8000/session";

export const loginUser = async (email, password) => {
    const response = await axios.post(
        "http://localhost:8000/session/login",
        {
            email,
            password,
        },
        {
            withCredentials: true,
        }
    );
    return response;
}