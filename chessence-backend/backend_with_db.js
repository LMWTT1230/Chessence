import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userServices from "./models/user-services.js";
import gameServices from "./models/game-services.js";

import sessionEndpoints from "./routes/sessions.js";

import { Server } from "socket.io";
import { createServer } from "http";
import { Chess } from "chess.js";

const app = express();
const server = createServer();
const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN,
    },
});

const port = 8000;
dotenv.config();

/** websocket code **/
io.listen(4000); // use this port for ws connections
// rooms is a dict of roomId : { white: id || undef, black: id || undef, chess: Chess }
const rooms = {};
const joinRoom = (socketId, roomId, time) => {
    if (roomId in rooms) {
        if (rooms[roomId].white === undefined) {
            rooms[roomId].white = socketId;
        } else if (rooms[roomId].black === undefined) {
            rooms[roomId].black = socketId;
        } else {
            return false;
        }
    } else {
        // create room
        rooms[roomId] = { white: socketId, black: undefined, timer: time };
    }
    return true;
};
io.on("connection", (socket) => {
    console.log(`a user connected (${socket.id})`);
    socket.on("disconnecting", () => {
        // remove user from the room they were in
        const currentRooms = socket.rooms;
        if (currentRooms.size >= 2) {
            const roomId = [...currentRooms].filter(
                (rId) => rId !== socket.id
            )[0];
            // remove user
            if (rooms[roomId].white === socket.id) {
                rooms[roomId].white = undefined;
            } else if (rooms[roomId].black === socket.id) {
                rooms[roomId].black = undefined;
            }
            // if only one person in room, emit wait
            if (
                rooms[roomId].white === undefined ||
                rooms[roomId].black === undefined
            ) {
                io.to(roomId).emit("waiting");
            } else {
                // delete room if no one in it
                delete rooms[roomId];
            }
        }
        console.log(`user disconnected (${socket.id})`);
    });

    socket.on("move", (move) => {
        const roomId = [...socket.rooms].filter((rId) => rId !== socket.id)[0];
        const currRoom = rooms[roomId];
        const playerColor = currRoom.white === socket.id ? "w" : "b";
        console.log(playerColor + move);
        if (currRoom.chess.turn() === playerColor) {
            try {
                console.log(move);
                currRoom.chess.move(move);
                io.to(roomId).emit("updateBoard", rooms[roomId].chess.pgn());
            } catch (e) {
                console.log(e);
            }
        }
    });

    socket.on("join", ({ roomId, time }) => {
        if (!joinRoom(socket.id, roomId, time)) {
            io.to(socket.id).emit("joinError");
        }
        console.log("Joined " + roomId + JSON.stringify(rooms[roomId]));
        socket.join(roomId);

        // emit start if start
        if (
            rooms[roomId].white === undefined ||
            rooms[roomId].black === undefined
        ) {
            console.log("w");
            io.to(roomId).emit("waiting");
        } else {
            // reset chessboard if 2nd player joins
            rooms[roomId].chess = new Chess();
            io.to(roomId).emit("updateBoard", rooms[roomId].chess.pgn());
            io.to(rooms[roomId].white).emit("starting", {
                color: "w",
                timer: rooms[roomId].timer,
            });
            io.to(rooms[roomId].black).emit("starting", {
                color: "b",
                timer: rooms[roomId].timer,
            });
        }
    });
});

/** REST API code **/
var corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/session", sessionEndpoints);

app.get("/login", async (req, res) => {
    const email = req.query["email"];
    const password = req.query["password"];

    try {
        const result = await userServices.login(email, password);

        if (result) {
            console.log(result);
            // const userId = userServices.findID(email);
            res.status(200).end();
        } else {
            res.status(401).end();
        }
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
});

app.post("/register", async (req, res) => {
    const user = req.body;
    const emailExist = await userServices.existEmail(user);
    const usernameExist = await userServices.existUsername(user);
    if (emailExist) {
        res.status(400).json({ error: "Email already exists" }).end();
    } else if (usernameExist) {
        res.status(400).json({ error: "Username already exists" }).end();
    } else {
        const savedUser = await userServices.addUser(user);
        console.log(savedUser);
        if (savedUser) {
            console.log("Successfully registered: ", savedUser);
            res.status(201)
                .json({ success: "Successfully registered!" })
                /*.send(savedUser)*/
                .end();
        } else {
            console.log("Failed to register savedUser");
            res.status(500).end();
        }
    }
});

app.put("/profile/:id", async (req, res) => {
    const id = req.params["id"];
    const user = req.body;
    const oldPwd = req.body.oldPwd;
    delete user["oldPwd"];

    const result = await userServices.updateProfile(id, user, oldPwd);

    if (result) {
        res.status(200).send(result);
    } else {
        res.status(400).end();
    }
});

app.get("/users/:id", async (req, res) => {
    const id = req.query["id"];
    try {
        const result = await userServices.getUsernameById(id);
        res.send({ username: result, id });
    } catch (error) {
        res.status(500).send("An error ocurred in the server.");
    }
});

app.get("/history", async (req, res) => {
    const id = req.query["id"];
    try {
        const result = await gameServices.getGames(id);
        res.send({ games_list: result });
    } catch (error) {
        res.status(500).send("An error ocurred in the server.");
    }
});

app.post("/results", async (req, res) => {
    const game = req.body;
    const savedGame = await gameServices.addGame(game);
    if (savedGame) res.status(201).send(savedGame);
    else res.status(500).end();
});

app.delete("/history/:id", async (req, res) => {
    const id = req.params["id"];
    const result = await gameServices.deleteGame(id);
    if (!result) {
        res.status(404).send("Resource not found.");
    } else {
        res.status(204).end();
    }
});

server.listen(process.env.PORT || port, () => {
    console.log("REST API is listening.");
});
