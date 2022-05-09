import "dotenv/config";
import express from "express";
import jwt from "jsonwebtoken";
import { users, refreshTokens } from "./db.js";
import authMiddleware from "./authMiddleware.js";

import login from "./API/login.js";

const app = express();
app.use(express.json()); //apllication-json

// MAIN SITE - test

app.get("/", (req, res) => {
    res.send("Witaj na stronie głównej");
});

// LOGIN add token
app.post("/login", async (req, res) => {
    const user = users.find((u) => u.email === req.body.email);
    console.log("req.body.email", req.body.email);

    if (!user) {
        return res.sendStatus(401); // niautoryzowany - błędne dane do logowania
    }

    const payload = user;

    const token = jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: "15s" }); // tego tokenu nie chcę przechowywać na serwerze
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: "1h" }); // ten token chcę przechowywać na serwerze

    refreshTokens.push(refreshToken);

    console.log(refreshTokens);

    res.json({ token, refreshToken });
});
// REFRESH-TOKEN

app.post("/refresh-token", (req, res) => {
    const { token } = req.body;

    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }

    jwt.verify(token, process.env.REFRESH_TOKEN, (err, data) => {
        if (err) {
            return res.sendStatus(403);
        }

        const payload = {
            id: data.id,
            name: data.name,
            email: data.email,
        };

        const newAccessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: "15s" });

        res.json({ token: newAccessToken });
    });
});

// ADMIN use token

app.delete("/logout", (req, res) => {
    const { refreshToken } = req.body;
    refreshTokens = refreshTokens.filter((t) => t != refreshToken);
    console.log(refreshTokens);
    res.sendStatus(204);
});

app.get("/admin", authMiddleware, (req, res) => {
    res.send("Witaj na stronie admina");
});

app.listen(process.env.PORT, () => console.log("Server słucha..."));
