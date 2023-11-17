import express from "express";
import cors from "cors";

import userServices from "./models/user-services.js";
import gameServices from "./models/game-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/login", async (req, res) => {
    const email = req.query["email"];
    const password = req.query["password"];

    try {
        const result = await userServices.login(email, password);

        if (result) {
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
    const savedUser = await userServices.addUser(user);
    if (savedUser) res.status(201).send(savedUser);
    else res.status(500).end();
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

app.delete("history/:id", async (req, res) => {
    const id = req.params["id"];
    const result = await gameServices.deleteGame(id);
    if (!result) {
        res.status(404).send("Resource not found.");
    } else {
        res.status(204).end();
    }
});

app.listen(process.env.PORT || port, () => {
    console.log("REST API is listening.");
});
