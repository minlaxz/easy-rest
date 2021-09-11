import { userLoginValidator, userRegisterValidator } from '../validators/userValidator.js';
import { unexceptedError } from '../lib/utils.js';
import { userNotValidRes } from '../responses/userResponse.js';

export const isValidUserLogin = (req, res, next) => {
    userLoginValidator(req.body)
        .then(({ error }) => error ? userNotValidRes(res, error) : next())
        .catch((err) => next(unexceptedError(err)));
}

export const isValidUserSignup = (req, res, next) => {
    userRegisterValidator(req.body)
        .then(({ error }) => error ? userNotValidRes(res, error) : next())
        .catch((err) => next(unexceptedError(err)));
}
