import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
}, { timestamps: true });

const User = mongoose.model('usermodels', UserSchema);
export default User;