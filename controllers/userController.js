import User from '../models/userModel.js';
import * as validators from '../validators/userValidator.js';
import bcrypt from 'bcrypt';

const unexceptedError = (err) => {
    const error = new Error('Unexcepted internal error');
    error.status = 500;
    error.stack = err;
    return error;
}

export const registerUser = async (req, res, next) => {
    try {
        const { error } = await validators.userRegisterValidator(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });
        const user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('User already registered');
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
                        message: 'User created successfully',
                        user: user
                    })
                })
                .catch(err => {
                    next(unexceptedError(err));
                });
        });
    } catch (err) {
        return next(unexceptedError(err));
    }

}


// export const loginUser = () => {

// }