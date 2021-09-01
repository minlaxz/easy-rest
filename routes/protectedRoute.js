import express from 'express';
import jwt from 'jsonwebtoken';
import { AuthVerifier } from '../auth/authVerifier.js';
const router = express.Router();
const SECRET_KEY = 'my super duper secret';

router.get('/', (req, res) => {
    res.status(200).json({ response: 'Welcome to protected endpoint. go to protected/super' });
})

const splitToken = (token) => {
    if (token.includes("Bearer")) {
        return token.split(" ")[1]
    } else {
        return token
    }
}

const verifyToken = async (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).json({ response: 'Unauthorized.' });
    } else {
        let token = splitToken(req.headers.authorization);
        console.log(token)
        jwt.verify(token, SECRET_KEY, { algorithms: ['HS256'] }, (err, decoded) => {
            if (err) {
                res.status(401).json({ response: 'Unauthorized.' });
            } else {
                req.decoded = decoded;
                next();
            }
        })
    }
}

router.get('/sensitive', verifyToken, async (req, res) => {
    res.status(200).json({ response: `This is a sensitive resource. ${JSON.stringify(req.decoded)}` });
})

router.get('/super', AuthVerifier, async (req, res) => {
    res.status(200).json({ response: 'This is a super secret resource.', user: req.user });
})

export default router;