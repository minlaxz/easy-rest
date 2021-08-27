import Joi from 'joi';

export const friendPostValidator = async (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(6)
            .required(),
        phone: Joi.string()
            .min(8)
            .required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
        accessLevel: Joi.number()
            .min(1)
            .max(2)
            .required(),
        createdAt: Joi.date()
    });
    return schema.validate(data);
}