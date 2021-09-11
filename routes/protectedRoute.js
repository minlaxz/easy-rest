import express from 'express';
import rateLimit from 'express-rate-limit';
import { isValidJWT } from '../lib/utils.js';

const router = express.Router();
router.get('/', (req, res) => {
    res.status(200).json({ response: 'Welcome to protected endpoint. go to /protected/jwt-sensitive' });
})

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    message: `Too many requests from this IP, please try again after 5 minutes`
})

router.get('/jwt-sensitive', limiter, isValidJWT, (req, res, next) => {
    const now = Date.now();
    res.status(200).json({
        success: true,
        message: 'You have successfully accessed a protected route using JWT.',
        sub: req.user?.sub,
        exp: req.user?.exp,
        expiredIn: 1 - (now - req.user?.exp) / 1000
    })
})

export default router;