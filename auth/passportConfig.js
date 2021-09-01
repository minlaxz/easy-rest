import LocalStrategy from 'passport-local';
import passport from 'passport';
import { validatePassword } from '../utils/passwordUtil.js';
import User from '../models/userModel.js';

const customFields = {
    usernameField: 'email',
    passwordField: 'password',
};

const verifyCallback = async (email, password, done) => {
    try {
        await User.findOne({ email }, async (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { code: 404, message: 'User not found' });
            }
            const validPassword = await validatePassword(password, user.password);
            if (!validPassword) {
                return done(null, false, { code: 401, message: 'Wrong password!' });
            }
            return done(null, user);
        });
    } catch (error) {
        done(error, false)
    }

};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy)

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});
