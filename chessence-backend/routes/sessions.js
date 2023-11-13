import express from "express";
import session from "express-session";
import userServices from "../models/user-services.js";

const router = express.Router();

const oneDayMs = 1000 * 60 * 60 * 24;
router.use(
    session({
        secret: "my-secret", // TODO make a process.env string
        resave: false, // don't save session if unmodified
        saveUninitialized: false, // don't create session until something stored
        cookie: { maxAge: oneDayMs }, // expire after a day
    })
);

router.post("/login", async (req, res) => {
    if (req.session.loggedIn) {
        res.status(200).json({ message: "already logged in!" });
    } else {
        // placeholder login logic
        try {
            const { email, password } = req.body;
            const result = await userServices.login(email, password);
            if (result.success) {
                res.status(200).json({ message: result.message });
            } else {
                res.status(401).json({ message: result.message });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "An error occurred during login.",
            });
        }
    }
});

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.status(200);
    res.send();
});

router.get("/authenticated", (req, res) => {
    if (req.session.loggedIn) {
        res.status(200);
        res.send();
    } else {
        res.status(401).json({ message: "Not Authenticated" });
    }
});

router.get("/", (req, res) => {
    if (req.session.views) {
        req.session.views++;
        res.setHeader("Content-Type", "text/html");
        res.write("<p>views: " + req.session.views + "</p>");
        res.write(
            "<p>expires in: " + req.session.cookie.maxAge / 1000 + "s</p>"
        );
        res.end();
    } else {
        req.session.views = 1;
        res.end("welcome to the session demo. refresh!");
    }
});

export default router;
