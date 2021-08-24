import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.get('/', async (req, res, next)=> {
    res.status(200).json({
        success: true,
        message: "OK"
    })
})
router.post('/signup', userController.registerUser);
// router.post('/login', userController.loginUser);

export default router;