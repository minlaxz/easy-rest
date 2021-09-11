import { githubValidator } from "../validators/index.js";

export const isValidBody = (req, res, next) => {
    githubValidator(req.query)
        .then(({ error }) => error
            ? res.status(400).json({
                error: error.details[0].message,
                message: "Missing Some Queries"
            })
            : next())
        .catch(error => next(error))
}