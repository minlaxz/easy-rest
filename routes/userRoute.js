import express from 'express';
import { loginUser, registerUser } from '../controllers/userController.js';
import { isValidUserLogin, isValidUserSignup } from '../middlewares/userMiddleware.js';
import { userHelloRes } from '../responses/userResponse.js';

const router = express.Router();

// router.use((req, res, next) => {
//     console.log(req)
//     next();
// })

router.get('/', async (req, res, next) => {
    return userHelloRes(res, `This is user route.`);
})
router.post('/signup', isValidUserSignup, registerUser);
router.post('/login', isValidUserLogin, loginUser);

/* This is for session authentication */
// router.get('/login-fail', (req, res) => {
//     res.sendStatus(401);
// })
// router.get('/login-success', (req, res) => {
//     res.status(200).redirect('/');
// })
// router.post('/logout', (req, res) => {
//     if (req.isAuthenticated()) req.logOut()
//     res.status(302).redirect('/');
// }) 

export default router;