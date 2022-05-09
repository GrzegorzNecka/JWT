import "dotenv/config";
import express from "express";
import jwt from "jsonwebtoken";
import { users, refreshTokens } from "./db.js";
import authMiddleware from "./authMiddleware.js";

import login from "./API/login.js";
import refreshToken from "./API/refreshToken.js";
import logout from "./API/logout.js";
import admin from "./API/admin.js";

global.refreshTokens = [];

const app = express();
//apllication-json
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Witaj na stronie głównej");
});

login(app);

refreshToken(app);

logout(app);

admin(app);

app.listen(process.env.PORT, () => console.log("Server słucha..."));
