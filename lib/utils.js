import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();
const pathToPrivKey = path.join(__dirname, 'keys/id_rsa_priv.pem');
const pathToPubKey = path.join(__dirname, 'keys/id_rsa_pub.pem');

const unauthorizedDude = (res, errorMessage) => (
    res.status(401).json({
        success: false,
        message: errorMessage || `Unauthorized dude!!`
    })
);

const notValidJWT = (message) => (
    process.env.NODE_ENV === `production`
        ? { success: false, payload: `Invalid authorization header format.` }
        : { success: false, payload: message }
)

const validJWT = (token) => ({ success: true, payload: token })

const isValidJWTForm = (token) => {
    const tokenParts = token.split(' ');
    if (tokenParts.length !== 2) return notValidJWT(`Token array lenght ${tokenParts.length} should be '2'`)
    if (tokenParts[0] !== `Bearer` || tokenParts[1].match(/\S+\.\S+\.\S+/) === null) return (notValidJWT(`Token is malformed or not included 'Bearer' prefix`))
    return (validJWT(tokenParts[1]))
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
    const expiresIn = 6e5; // 10 min
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
    /* Validate with PUB key */
    const PUBLIC_KEY = fs.readFileSync(pathToPubKey, 'utf8');

    const formValidation = isValidJWTForm(req.headers.authorization);

    if (formValidation.success) {
        jwt.verify(formValidation.payload, PUBLIC_KEY, { algorithms: ["RS256"] }, (err, decoded) => {
            if (err) return unauthorizedDude(res, err.message);
            const now = Date.now();

            /* exp is will be less than 'now' if it is expired already */
            if (decoded.exp < now) return unauthorizedDude(res, `Token is expired by ${1 - (decoded.exp - now) / 1000}s`);
            req.user = decoded;
            next();
        });
    } else {
        return unauthorizedDude(res, formValidation.payload)
    }
}

export const isProduction = () => (process.env.NODE_ENV === "production")

/* My super duper error forwarder */
export const unexceptedError = (err) => {
    const error = new Error('Unexcepted internal error');
    error.status = 500;
    if (err) error.where = err
    return error;
}