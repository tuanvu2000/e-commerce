const mongoose = require('mongoose');
const { schemaOptions } = require('./modelOptions');

const profileSchema = new mongoose.Schema({
    isUser: {
        type: Boolean,
        required: true,
        default: true
    },
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    fullName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        default: 'male'
    },
    birthday: {
        type: String
    },
    avatar: {
        type: String
    },
    cloudinaryId: {
        type: String
    }
}, schemaOptions);

module.exports = mongoose.model('Profile', profileSchema);

// const mongoose = require('mongoose');
// const { schemaOptions } = require('./modelOptions');

// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     role: {
//         type: String,
//         required: true,
//         default: 'user',
//         enum: ['user', 'admin', 'mod']
//     },
//     fullName: {
//         type: String,
//         // required: true
//     },
//     phoneNumber: {
//         type: String,
//         // required: true
//     },
//     address: {
//         type: String,
//         // required: true
//     },
//     gender: {
//         type: String,
//         // required: true,
//         default: 'male'
//     },
//     birthday: {
//         type: String
//     },
//     avatar: {
//         type: String
//     },
//     cloudinaryId: {
//         type: String
//     }
// }, schemaOptions);

// module.exports = mongoose.model('User', userSchema);