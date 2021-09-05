import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();
const pathToPrivKey = path.join(__dirname, 'keys/id_rsa_priv.pem');
const pathToPubKey = path.join(__dirname, 'keys/id_rsa_pub.pem');

const unauthorizedDude = (res, errorMessage) => {
    return res.status(401).json({
        success: false,
        message: errorMessage || `Unauthorized dude!!`
    });
}

export const validatePassword = async (password, hash) => {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        throw new Error(`Error validating password : ${error}`);
    }
};

export const hashPassword = async (password, saltRounds) => {
    try {
        return await bcrypt.hash(password, saltRounds)
    } catch (error) {
        throw new Error(`Error hashing password : ${error}`);
    }
};

export const issueJWT = (user) => {
    /* Signed with private key */
    const PRIV_KEY = fs.readFileSync(pathToPrivKey, 'utf8');
    const expiresIn = 30;
    const payload = {
        sub: user.id,
        iat: Date.now()
    };
    const signedToken = jwt.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });
    return {
        token: `Bearer ${signedToken}`,
        expiresIn: expiresIn
    }
}

export const isValidJWT = (req, res, next) => {
    if (!req.headers.authorization) return unauthorizedDude(res, 'No authorization header');
    const tokenParts = req.headers.authorization.split(' ');
    if (tokenParts.length !== 2) return unauthorizedDude(res, 'Invalid authorization header');
    if (tokenParts[0] === "Bearer" && tokenParts[1].match(/\S+\.\S+\.\S+/) !== null) {
        /* Header is validate */
        const token = tokenParts[1];
        const PUBLIC_KEY = fs.readFileSync(pathToPubKey, 'utf8');
        jwt.verify(token, PUBLIC_KEY, { algorithms: ["RS256"] }, (err, decoded) => {
            if (err) return unauthorizedDude(res, err.message);
            req.user = decoded;
            next();
        });
    } else {
        return unauthorizedDude(res, 'Invalid authorization header');
    }
}