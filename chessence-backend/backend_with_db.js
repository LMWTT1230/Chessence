import express from "express";
import cors from "cors";

import userServices from "./models/user-services.js";

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
                .send(savedUser)
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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
