import Joi from 'joi';

export const userRegisterValidator = async (data) => {
    const schema = Joi.object({
        username: Joi.string()
            .alphanum()
            .min(6)
            .max(30)
            .required(),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),

        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required()
    });
    return schema.validate(data);
}

export const userLoginValidator = async (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required()
    });
    return schema.validate(data);
}