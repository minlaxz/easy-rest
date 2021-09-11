import Joi from 'joi';

/**
 * @description Validates user input for registration
 * @param {object} data - The request body object
 * @returns {object} - The error object
 */
export const userRegisterValidator = async (data) => {
    const schema = Joi.object({
        username: Joi.string()
            .alphanum()
            .min(6)
            .max(30)
            .required(),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .required(),

        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'dev', 'org'] } })
            .required()
    });
    return schema.validate(data);
}

/**
 * @description Validates user input for login
 * @param {object} data - The request body object
 * @returns {object} - The error object
 */
export const userLoginValidator = async (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'dev', 'org'] } })
            .required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .required()
    });
    return schema.validate(data);
}