import "dotenv/config";
import express from "express";
import jwt from "jsonwebtoken";
import users from "./db.js";
import authMiddleware from "./authMiddleware.js";

const app = express();
app.use(express.json()); //apllication-json
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

app.get("/", (req, res) => {
    res.send("Witaj na stronie głównej");
});

app.get("/admin", authMiddleware, (req, res) => {
    res.send("Witaj na stronie admina");
});

app.post("/login", (req, res) => {
    const user = users.find((u) => u.email === req.body.email);
    console.log("req.body.email", req.body.email);

    if (!user) {
        return res.sendStatus(401); // niautoryzowany - błędne dane do logowania
    }

    const payload = user;
    const token = jwt.sign(payload, ACCESS_TOKEN);

    res.json({ token });
});

app.listen(process.env.PORT, () => console.log("Server słucha..."));
