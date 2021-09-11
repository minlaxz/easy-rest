import Joi from 'joi';

export const githubValidator = async (data) => {
    const schema = Joi.object({
        user: Joi.string(),
        repo: Joi.string()
            .min(3)
            .required(),
        branch: Joi.string()
    });
    return schema.validate(data);
}