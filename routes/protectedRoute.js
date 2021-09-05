import express from 'express';
import { isValidJWT } from '../lib/utils.js';

const router = express.Router();
router.get('/', (req, res) => {
    res.status(200).json({ response: 'Welcome to protected endpoint. go to protected/jwt-sensitive' });
})

router.get('/jwt-sensitive', isValidJWT, (req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'You have successfully accessed a protected route using JWT.',
        user: req.user
    })
})

export default router;