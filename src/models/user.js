import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    id: {type: String, unique: true},
    name: String,
    photo: String,
    email: String,
    createdAt: {type: Date, default: Date.now}
});

const User = mongoose.model('User', UserSchema);

export default User;