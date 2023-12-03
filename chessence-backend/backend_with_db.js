import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userServices from "./models/user-services.js";
import gameServices from "./models/game-services.js";

import sessionEndpoints from "./routes/sessions.js";

import { Server } from "socket.io";
import { createServer } from "http";

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
// rooms is a dict of roomId : player array
const rooms = {};
const joinRoom = (socketId, roomId) => {
    if (roomId in rooms) {
        if (rooms[roomId].indexOf(socketId) === -1) {
            rooms[roomId].push(socketId);
        }
    } else {
        rooms[roomId] = [socketId];
    }
}
io.on("connection", (socket) => {
    console.log(`a user connected (${socket.id})`);
    socket.on("disconnecting", () => {
        // remove user from the room they were in
        const currentRooms = socket.rooms;
        if (currentRooms.size >= 2) {
            const roomId = [...currentRooms].filter(
                (rId) => rId !== socket.id
            )[0];
            rooms[roomId] = rooms[roomId].filter(
                (player) => player !== socket.id
            );
            // if only one person in room, emit wait
            let players = rooms[roomId];
            if (players.length === 1) {
                io.to(roomId).emit("waiting");
            }
        }
        console.log(`user disconnected (${socket.id})`);
    });

    socket.on("move", (move) => {
        console.log(`move ${JSON.stringify(move)} (${socket.id})`);
    });

    socket.on("join", (roomId) => {
        joinRoom(socket.id, roomId);
        console.log("Joined " + roomId + JSON.stringify(rooms[roomId]));
        socket.join(roomId);

        // emit start if start
        let players = rooms[roomId];
        if (players.length === 1) {
            console.log("w");
            io.to(roomId).emit("waiting");
        } else if (players.length === 2) {
            console.log("s");
            io.to(roomId).emit("starting");
        }
    });
});

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
        res.send({ username: result });
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
