const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    accessLevel: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('laxzcols', FriendSchema);