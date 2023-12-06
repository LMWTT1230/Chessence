import { io } from "socket.io-client";

// setting URL to "undefined" means the URL
// will be computed from the `window.location` object
const URL = process.env.REACT_APP_BACKEND;

// connects to socket
export const socket = io(URL);
