import "dotenv/config";
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    // headers ['authorization'] = 'Bear dfgesdfgcfff'

    const token = req.headers["authorization"]?.split(" ")[1]; //dfgesdfgcfff

    if (!token) {
        // return res.status(401).render("index", {
        //     pageBody:
        //         "Unauthorized - If You want to access tehe resource, use Bear schama authentication with correct JWT",
        // });

        return res
            .status(401)
            .send(
                "Unauthorized - If You want to access tehe resource, use Bear schama authentication with correct JWT"
            );
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, data) => {
        if (err) {
            return res.sendStatus(403);
        }

        req.user = data.user;

        next(); //niech się dzieje dalszy kod
    });
};

export default authMiddleware;
