import express from 'express';
import { AuthVerifier } from '../auth/authVerifier.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { isValidJWT } from '../lib/utils.js';

const router = express.Router();
router.get('/', (req, res) => {
    res.status(200).json({ response: 'Welcome to protected endpoint. go to protected/whoami' });
})

router.get('/super', AuthVerifier, async (req, res) => {
    res.status(200).json({ response: 'This is a super secret resource.', user: req.user });
})

router.get('/whoami', isAuthenticated, async (req, res) => {
    res.status(200).json({ response: 'This is a super secret resource.', user: req.user });
})

router.get('/jwt-sensitive', isValidJWT, (req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'You have successfully accessed a protected route using JWT.',
        user: req.user
    })
})

export default router;