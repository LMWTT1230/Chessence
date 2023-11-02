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

        if (result.success) {
            res.status(200).json({ message: result.message });
        } else {
            res.status(401).json({ message: result.message });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred in the server." });
    }
});

app.post("/register", async (req, res) => {
    const user = req.body;
    const result = await userServices.addUser(user);
    if (result.success) res.status(201).send(result);
    else res.status(400).json({ message: result.message });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
