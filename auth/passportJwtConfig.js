import { ExtractJwt, Strategy } from 'passport-jwt';
import passport from 'passport';
import fs from 'fs';
import path from 'path';
import User from '../models/userModel.js';

const __dirname = path.resolve();
const pathToKey = path.join(__dirname, 'keys/id_rsa_pub.pem');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: fs.readFileSync(pathToKey, 'utf8'),
    algorithms: ['RS256']
}

const verifyCallback = async (payload, done) => {
    try {
        const user = await User.findById(payload.sub);
        if (!user) {
            return done(null, false);
        }
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}

const strategy = new Strategy(options, verifyCallback);

passport.use(strategy);
