import User from '../models/userModel.js';
import { hashPassword, validatePassword, issueJWT, unexceptedError } from '../lib/utils.js'
import { userAlreadyRegisterRes, userLoggedInRes, userCreatedRes, userNotFoundRes } from '../responses/userResponse.js';

export const registerUser = async (req, res, next) => {
    /* Check if the user already exists */
    const user = await User.findOne({ email: req.body.email });
    if (user) return userAlreadyRegisterRes(res, `Provided email is already registered.`)

    /* Hash the password */
    const hashed = await hashPassword(req.body.password, 10);
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed
    })
    await newUser.save()
        .then(user => userCreatedRes(res, user))
        .catch(err => {
            next(unexceptedError(err));
        });
}

export const loginUser = async (req, res, next) => {
    /* Deprecated Session Authtication */
    // passport.authenticate('local', { failureRedirect: '/user/login-fail', successRedirect: '/user/login-success' })(req, res, next);

    /* Check if the user already exists*/
    const userFromDB = await User.findOne({ email: req.body.email });
    if (!userFromDB) return userNotFoundRes(res, `User could not be found with provided email`)

    const isValidPassword = await validatePassword(req.body.password, userFromDB.password);
    if (isValidPassword) {
        /* Valid user, issue JWT */
        const { token, expiresIn } = issueJWT(userFromDB)
        userLoggedInRes(res, token, expiresIn)
    } else {
        /* Invalid login credentials */
        return userNotFoundRes(res, `Invalid Password.`)
    }
}