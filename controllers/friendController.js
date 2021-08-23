import Friend from '../models/friendModel.js';

export const getFriends = async (req, res) => {
    await Friend.find()
    .then(data => {
        res.status(200).json({ 'response': data });
    }).catch(err => {
        res.status(500).json({ 'response': err });
    })
}