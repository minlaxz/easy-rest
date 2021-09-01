import User from '../models/userModel.js';
import * as validators from '../validators/userValidator.js';
// import jwt from 'jsonwebtoken';
import { hashPassword } from '../utils/passwordUtil.js';
import passport from 'passport';

// My super duper error handler
const unexceptedError = (err) => {
    const error = new Error('Unexcepted internal error');
    error.status = 500;
    if (err) error.where = err
    return error;
}

export const registerUser = async (req, res, next) => {

    // Validate the request
    try {
        const { error } = await validators.userRegisterValidator(req.body);
        if (error) return res.status(400).json({ success: false, message: error.details[0].message });
    } catch (err) {
        next(unexceptedError(err));
    }
    // Check if the user already exists
    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json({ success: false, message: 'Email is already registered' });

    // Hash the password
    // let hashed = await bcrypt.hash(req.body.password, 10)
    const hashed = await hashPassword(req.body.password, 10);
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed
    })
    await newUser.save()
        .then(user => {
            res.status(201).json({
                success: true,
                message: 'User created successfully',
                user: user
            })
        })
        .catch(err => {
            next(unexceptedError(err));
        });
}



export const loginUser = async (req, res, next) => {
    // Validate the request
    try {
        const { error } = await validators.userLoginValidator(req.body);
        if (error) return res.status(400).json({ success: false, message: error.details[0].message });
    } catch (error) {
        next(unexceptedError(error));
    }
    passport.authenticate('local', { failureRedirect: '/user/login-fail', successRedirect: '/user/login-success' })
        (req, res, next);

    /* Check if the user already exists*/
    // const user = await User.findOne({ email: req.body.email });
    // if (!user) return res.status(400).json({ success: false, message: 'User not found' });

    /* Check if the password is correct */
    // const validPassword = await validatePassword(req.body.password, user.password);
    // if (!validPassword) return res.status(400).json({ success: false, message: 'Invalid password' });
    // const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // res.header({ "auth-token": token }).status(200).json({
    //     success: true,
    //     message: 'User logged in successfully',
    //     token: token
    // });
    /* frontend need to store hashed user id */
}