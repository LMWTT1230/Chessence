import axios from "axios";

const endpoint = "https://chessence.azurewebsites.net/session";

/**
 * Tries to log in a user with a given email and password.
 * Throws an error if login is unsuccessful.
 * @param {string} email a user's email
 * @param {string} password a user's password
 */
export const loginUser = async (email, password) => {
    const response = await axios.post(
        endpoint + "/login",
        {
            email,
            password,
        },
        {
            withCredentials: false,
        }
    );
    //console.log(response.data.id);
    return response;
};

/**
 * Tries to log in a user with a given email and password.
 * Throws an error if logout is unsuccessful.
 */
export const logoutUser = async () => {
    const response = await axios.get(endpoint + "/logout", {
        withCredentials: false,
    });
    return response;
};

/**
 * Checks if the current session is authenticated (user is logged in)
 * @returns {boolean}
 */
export const isAuthenticated = async () => {
    try {
        const response = await axios.get(endpoint + "/authenticated", {
            withCredentials: false,
        });
        return true;
    } catch (error) {
        return false;
    }
};
