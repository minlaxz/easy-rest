import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    let message;
    switch (req.query.type) {
        case "friend":
            message = '404: Friend with that ID cannot be found :(';
            break;
        case "route":
            message = `404: That Route cannot be found :( ${req.query.path ?? ""}`; // TODO Can you XSS this ?
            break;
        case "friend_id":
            message = '404: I think friend ID is imcompleted :(';
            break;
        default:
            message = '404: Page Not Found';
            break;
    }
    // res.status(404).render('404', { data: { message } });
    res.status(404).json({
        success: false,
        authentication: false,
        message
    })
});

export default router;