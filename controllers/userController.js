import User from '../models/userModel.js';
import { userLoginValidator, userRegisterValidator } from '../validators/userValidator.js';
import { hashPassword, validatePassword, issueJWT } from '../lib/utils.js'

/* My super duper error forwarder */
const unexceptedError = (err) => {
    const error = new Error('Unexcepted internal error');
    error.status = 500;
    if (err) error.where = err
    return error;
}

export const registerUser = async (req, res, next) => {

    /* Validate the request */
    try {
        const { error } = await userRegisterValidator(req.body);
        if (error) return res.status(400).json({ success: false, message: error.details[0].message });
    } catch (err) {
        next(unexceptedError(err));
    }
    /* Check if the user already exists */
    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json({ success: false, message: 'Email is already registered' });

    /* Hash the password */
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
    /* Validate the request */
    try {
        const { error } = await userLoginValidator(req.body);
        if (error) return res.status(400).json({ success: false, message: error.details[0].message });
    } catch (error) {
        next(unexceptedError(error));
    }

    /* Deprecated Session Authtication */
    // passport.authenticate('local', { failureRedirect: '/user/login-fail', successRedirect: '/user/login-success' })(req, res, next);

    /* Check if the user already exists*/
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ success: false, message: 'User not found' });

    const isValidPassword = await validatePassword(req.body.password, user.password);
    if (isValidPassword) {
        /* Valid user, issue JWT */
        const tokenObject = issueJWT(user)
        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            token: tokenObject.token,
            expiresIn: tokenObject.expiresIn
        })
    } else {
        /* Invalid login credentials */
        res.status(400).json({
            success: false,
            message: 'Invalid password'
        })
    }
}