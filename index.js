import "dotenv/config";
import express from "express";

import login from "./API/login.js";
import refreshToken from "./API/refreshToken.js";
import logout from "./API/logout.js";
import admin from "./API/admin.js";

global.refreshTokens = [];

const app = express();

app.use(express.json()); //apllication-json
app.set("view engine", "hbs");

app.get("/", (req, res) => {
    res.render("index", {
        pageBody: "hello",
    });
});

login(app);

refreshToken(app);

logout(app);

admin(app);

app.listen(process.env.PORT, () => console.log(`server słucha na porcie ${process.env.PORT}`));
