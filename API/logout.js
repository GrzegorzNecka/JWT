const logout = (app) => {
    return app.delete("/logout", (req, res) => {
        const { refreshToken } = req.body;

        global.refreshTokens = global.refreshTokens.filter((t) => t != refreshToken);

        return res.sendStatus(204);
    });
};

export default logout;
