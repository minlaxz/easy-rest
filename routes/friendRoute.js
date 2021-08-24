import express from 'express';
import Friend from '../models/friendModel.js';
import { deleteAFriend, getAFriend, getFriends, updateAFriend } from '../controllers/friendController.js';

const router = express.Router();

router.use('/:id', (req, res, next) => {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        next();
    } else {
        const error = new Error('Invalid id');
        error.status = 400;
        next(error);
    }
});

router.get('/', getFriends);
router.get('/:id', getAFriend);
router.delete('/:id', deleteAFriend);
router.patch('/:id', updateAFriend);

router.post('/', (req, res) => {
    let friend = new Friend({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        accessLevel: req.body.accessLevel
    });
    friend.save()
        .then(data => {
            res.status(201).json({ 'response': data });
        }).catch(err => {
            res.status(500).json({ 'response': err });
        })
})


// my super duper error handler
// router.use((error, req, res, next) => {
//     console.log(error.stack);
//     if (res.headersSent) {
//         return next(error);
//     }
//     res.status(error?.status || 500).send({
//         message: error?.message || 'Internal Server Error'
//     });
// });

export default router;
