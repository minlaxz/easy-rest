import { githubValidator } from "../validators/githubValidator.js";

export const isValid = async (req, res, next) => {
    try {
        const { error } = await githubValidator(req.query);
        if (error) return res.status(400).json({
            error: error.details[0].message,
            message: "Missing Some Queries"
        })
    } catch (error) {
        next(error);
    }
    next();
}