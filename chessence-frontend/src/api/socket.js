import { io } from "socket.io-client";

// setting URL to "undefined" means the URL
// will be computed from the `window.location` object
const URL = "http://localhost:4000";

// connects to socket
export const socket = io(URL);
