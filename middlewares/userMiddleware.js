import { userLoginValidator, userRegisterValidator } from '../validators/userValidator.js';
import { unexceptedError } from '../lib/utils.js';
import { userNotValidRes } from '../responses/userResponse.js';

export const isValidUserLogin = async (req, res, next) => {
    try {
        const { error } = await userLoginValidator(req.body);
        if (error) return userNotValidRes(res, error);
    } catch (error) {
        next(unexceptedError(error));
    }
    next();
}

export const isValidUserSignup = async (req, res, next) => {
    try {
        const { error } = await userRegisterValidator(req.body);
        if (error) return userNotValidRes(res, error);
    } catch (err) {
        next(unexceptedError(err));
    }
    next();
}