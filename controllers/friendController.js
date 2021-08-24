import Friend from '../models/friendModel.js';

const unexceptedError = (err) => {
    const error = new Error('Unexcepted internal error');
    error.status = 500;
    error.stack = err;
    return error;
}

export const getFriends = async (req, res, next) => {
    await Friend.find()
        .then(data => {
            res.status(200).json({ 'response': data });
        }).catch(err => next(unexceptedError(err)));
}

export const getAFriend = async (req, res, next) => {
    // mongoose.Types.ObjectId.isValid(id)
    await Friend.findById(req.params.id)
        .then(response => {
            if (!response) {
                res.status(404).json({ 'response': 'Resource Not found' });
            } else {
                res.status(200).json({ 'response': response });
            }
        }).catch(err => next(unexceptedError(err)));
}

export const deleteAFriend = async (req, res, next) => {
    await Friend.deleteOne({ _id: req.params.id })
        .then(response => {
            if (!response) {
                res.status(404).json({ 'response': 'Resource Not found' });
            } else {
                res.status(200).json({ 'response': response });
            }
        }).catch(err => next(unexceptedError(err)));
}

export const updateAFriend = async (req, res, next) => {
    await Friend.updateOne(
        { _id: req.params.id },
        req.body.phone ? { $set: { phone: req.body.phone } } : console.log('Nothing to update'),
    ).then(response => {
        if (!response) {
            res.status(404).json({ 'response': 'Resource Not found' });
        } else {
            res.status(200).json({ 'response': response });
        }
    }).catch(err => next(unexceptedError(err)));
}