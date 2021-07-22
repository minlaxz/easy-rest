const express = require('express');
const router = express.Router();
const Friend = require('../models/friend');

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

router.get('/', (req, res) => {
    Friend.find()
        .then(data => {
            res.status(200).json({ 'response': data });
        }).catch(err => {
            res.status(500).json({ 'response': err });
        })
})

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

module.exports = router;
