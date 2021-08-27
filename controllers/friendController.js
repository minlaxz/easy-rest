import Friend from '../models/friendModel.js';
import { friendPostValidator } from '../validators/friendValidator.js';

const unexceptedError = (err) => {
    const error = new Error('Unexcepted internal error');
    error.status = 500;
    error.stack = err;
    return error;
}

const noFriendFound = (req, res) => {
    res.status(302).redirect('/notfound?type=friend');
}

export const getFriends = async (req, res, next) => {
    await Friend.find()
        .then(data => {
            res.status(200).json({ success: true, message: data });
        }).catch(err => next(unexceptedError(err)));
}

export const getAFriend = async (req, res, next) => {
    // mongoose.Types.ObjectId.isValid(id)
    await Friend.findById(req.params.id)
        .then(response => {
            if (!response) return noFriendFound(req, res);
            res.status(200).json({ success: true, message: response });
        }).catch(err => next(unexceptedError(err)));
}

export const deleteAFriend = async (req, res, next) => {
    await Friend.deleteOne({ _id: req.params.id })
        .then(response => {
            if (!response) return noFriendFound(req, res);
            res.status(200).json({ success: true, message: response });
        }).catch(err => next(unexceptedError(err)));
}

export const updateAFriend = async (req, res, next) => {
    await Friend.updateOne(
        { _id: req.params.id },
        req.body.phone ? { $set: { phone: req.body.phone } } : console.log('Nothing to update'),
    ).then(response => {
        if (!response) return noFriendFound(req, res);
        res.status(200).json({ success: true, message: response });
    }).catch(err => next(unexceptedError(err)));
}

export const postAFriend = async (req, res, next) => {
    try {
        const { error } = await friendPostValidator(req.body);
        if (error) return res.status(400).json({
            success: false,
            error: error.details[0].message
        })
    } catch (err) {
        next(unexceptedError(err))
    }
    let friend = new Friend({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        accessLevel: req.body.accessLevel
    });
    friend.save()
        .then(data => {
            res.status(201).json({ success: true, message: data._id })
        })
        .catch(err => {
            next(unexceptedError(err));
        });
}