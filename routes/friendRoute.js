import express from 'express';
import Friend from '../models/friendModel.js';
import { getFriends } from '../controllers/friendController.js';

const router = express.Router();

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

router.get('/', getFriends);

router.get('/:id', (req, res) => {
    console.log("Searching id = %s", req.params.id);
    Friend.findById(req.params.id)
        .then(response => {
            if (!response) {
                res.status(404).json({ 'response': 'Resource Not found' });
            } else {
                res.status(200).json({ 'response': response });
            }
        }).catch(err => {
            res.status(500).json({ 'response': err });
        })
})

router.delete('/:id', (req, res) => {
    console.log("Deleting id = %s", req.params.id);
    Friend.deleteOne({ _id: req.params.id })
        .then(response => {
            if (!response) {
                res.status(404).json({ 'response': 'Resource Not found' });
            } else {
                res.status(200).json({ 'response': response });
            }
        }).catch(err => {
            res.status(500).json({ 'response': err });
        })
})

router.patch('/:id', (req, res) => {
    console.log("Updating id = %s", req.params.id);
    Friend.updateOne(
        { _id: req.params.id },
        req.body.phone ? { $set: { phone: req.body.phone } } : console.log('Nothing to update'),
    ).then(response => {
        if (!response) {
            res.status(404).json({ 'response': 'Resource Not found' });
        } else {
            res.status(200).json({ 'response': response });
        }
    }).catch(err => {
        res.status(500).json({ 'response': err });
    });
})

export default router;
