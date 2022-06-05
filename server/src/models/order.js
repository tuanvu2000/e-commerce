const mongoose = require('mongoose');
const { schemaOptions } = require('./modelOptions');

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        anonymouse: {
            fullName: String,
            email: String,
            phoneNumber: String,
            address: String
        }
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        quantity: Number,
    }],
    transportFee: Number,
    note: String,
    status: {
        type: String,
        required: true,
        default: 'Chờ xử lý'
    },
    total: Number,
}, schemaOptions);

module.exports = mongoose.model('Order', orderSchema);