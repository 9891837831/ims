const jwt = require("jsonwebtoken");
const tokenLength = 2;
require("dotenv").config();

function generateAuthToken(user) {
    return jwt.sign(
        { email: user.email, _id: user._id, user_id: user.user_id },
        process.env.JWT_SECRET,
        {}
    );
}

function VerifyToken(req, res, next) {
    const authorization = req.headers["authorization"];
    if (!authorization) {
        return res.sendStatus(401);
    }

    const token = authorization.split(" ");
    if (token.length !== tokenLength || token[0].toLowerCase() !== "bearer") {
        return res.sendStatus(401);
    }

    const accessToken = token[1];
    jwt.verify(accessToken, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        if (data) {
            req.user = data;
            next();
        }
    });
}

module.exports = {
    generateAuthToken,
    VerifyToken,
};
