import Joi from 'joi';

/**
 * @description Validates the github repository
 * @param {object} data - The request object
 * @returns {object} - The error object
*/
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