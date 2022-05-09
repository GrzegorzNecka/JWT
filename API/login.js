import "dotenv/config";
import jwt from "jsonwebtoken";
import { users } from "./../db.js";

const login = (app) => {
    return app.post("/login", async (req, res) => {
        const user = users.find((u) => u.email === req.body.email);

        if (!user) {
            return res.sendStatus(401); // niautoryzowany - błędne dane do logowania
        }

        const payload = user;

        const token = jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: "30s" }); // tego tokenu nie chcę przechowywać na serwerze
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: "1h" }); // ten token chcę przechowywać na serwerze

        global.refreshTokens.push(refreshToken);

        res.json({ token, refreshToken });
    });
};

export default login;
