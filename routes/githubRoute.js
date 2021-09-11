import express from 'express';
import { lastcommit } from '../controllers/githubController.js';
import { isValidBody } from '../middlewares/githubMiddleware.js';

const router = express.Router();

router.get("/", async (req, res, next) => {
    res.status(200).json({
        success: true,
        authentication: false,
        message: "Github Routes."
    });
})


router.use("/lastcommit", isValidBody, lastcommit)

export default router;