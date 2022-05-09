import "dotenv/config";
import authMiddleware from "./../authMiddleware.js";

const admin = (app) => {
    return app.get("/admin", authMiddleware, (req, res) => {
        // res.send("Witaj na stronie admina");

        res.render("index", {
            pageBody: "admin page",
        });
    });
};

export default admin;
