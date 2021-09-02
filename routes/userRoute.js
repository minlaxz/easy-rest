import express from 'express';
import * as userController from '../controllers/userController.js';
const router = express.Router();

router.get('/', async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "OK"
    })
})
router.post('/signup', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/login-fail', (req, res) => {
    res.sendStatus(401);
})

router.get('/login-success', (req, res) => {
    res.status(200).redirect('/');
})

router.post('/logout', (req, res) => {
    if (req.isAuthenticated()) req.logOut()
    res.status(302).redirect('/');
})

export default router;