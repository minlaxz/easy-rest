import express from 'express';
import { Mongoose } from 'mongoose';
import * as friendController from '../controllers/friendController.js';

const router = express.Router();

router.use('/:id', (req, res, next) => {
    if (Mongoose.Types.ObjectId.isValid(req.params.id)) {
        // if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        next();
    } else {
        res.status(302).redirect('/notfound?type=friend_id');
        /* to simulate an error stack */
        // const error = new Error('Invalid id');
        // error.status = 400;
        // next(error);
    }
});

router.get('/', friendController.getFriends);
router.get('/:id', friendController.getAFriend);
router.delete('/:id', friendController.deleteAFriend);
router.patch('/:id', friendController.updateAFriend);
router.post('/', friendController.postAFriend);

export default router;
