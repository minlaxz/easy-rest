/* Deprecated JWT Method */
import jwt from "jsonwebtoken";

// for now i do not compare the hash
export const AuthVerifier = async (req, res, next) => {
    const authToken = req.headers.authorization;
    console.log(authToken);
    if (!authToken) {
        return res.status(401).json({
            message: "No token, screwed you! leave me alone!!"
        });
    }
    // Bearer token
    const token = authToken.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Invalid token"
            });
        }
        req.user = decoded;
        // TODO? frontend need to store hashed user id
        next();
    });
}