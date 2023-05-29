const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true },
    bio: { type: String, required: false },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },
    isAdmin: { type: Boolean, default: false },
    favorite: { type: Array, required: false }
});

const User = mongoose.model('User', userSchema);

module.exports = User;