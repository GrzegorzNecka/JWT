import "dotenv/config";
import jwt from "jsonwebtoken";

const refreshToken = (app) => {
    return app.post("/refresh-token", (req, res) => {
        const { token } = req.body;

        const refreshTokens = global.refreshTokens;
        console.log(refreshTokens);

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
};

export default refreshToken;
