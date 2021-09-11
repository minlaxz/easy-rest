import rateLimit from "express-rate-limit"

export const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    handler: (req, res, next) => {
        return res.status(429).json({
            success: false,
            authentication: false,
            message: `Reach to rate limit :) try again in next 1 min!`
        })
    }
})