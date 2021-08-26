import User from '../models/userModel.js';
import * as validators from '../validators/userValidator.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
        if (error) return res.status(400).json({ success: false, error: error.details[0].message });
    } catch (err) {
        next(unexceptedError(err));
    }
    // Check if the user already exists
    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('Email is already registered');

    // Hash the password
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, async (err, hashed) => {
        if (err) return next(unexceptedError(err));
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashed
        });
        await newUser.save()
            .then(user => {
                res.status(201).send({
                    success: true,
                    message: 'User created successfully',
                    userID: user._id,
                })
            })
            .catch(err => {
                next(unexceptedError(err));
            });
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
    // Check if the user already exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ success: false, message: 'User not found' });

    // Check if the password is correct
    bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) return next(unexceptedError(err));
        if (!result) return res.status(400).json({ success: false, message: 'Invalid password' });
        const saltRounds = 10;
        bcrypt.hash(user._id.toString(), saltRounds, async (err, hashed) => {
            if (err) return next(unexceptedError(err));
            const authToken = jwt.sign({ _id: hashed }, process.env.JWT_SECRET); //, { expiresIn: '1h' });
            res.header({ "auth-token": authToken }).status(200).json({
                success: true,
                message: 'User logged in successfully',
            }); /* response */
        }); /* bcrypt.hash */
    }); /* bcrypt.compare */
}