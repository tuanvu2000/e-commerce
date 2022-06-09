const mongoose = require('mongoose');
const { schemaOptions } = require('./modelOptions');

const accountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'admin', 'mod']
    }
}, schemaOptions);

module.exports = mongoose.model('Account', accountSchema);
