import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    let token = req.header("Authorization");
    console.log(token, "token------");

    try {
        if (!token) return res.status(404).json({ message: "Authentication failed: no token provided." });

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = await jwt.verify(token, process.env.JWT_SECRET);

        req.user = verified;
        next();
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Authentication failed: invalid token." });
    }
};

export const generateToken = (userId) => {
    console.log(userId, "userId =========");
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);
    return token;
};
