import mongoose from 'mongoose';
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
const Friend = mongoose.model('laxzcols', FriendSchema);
export default Friend;