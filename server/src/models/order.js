const mongoose = require('mongoose');
const { schemaOptions } = require('./modelOptions');

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: Number,
        }
    ],
    transportFee: Number,
    note: String,
    status: {
        type: String,
        required: true,
        enum: ['Chờ xử lý', 'Đã hoàn thành', 'Hủy đơn hàng'],
        default: 'Chờ xử lý'
    },
    total: Number,
}, schemaOptions);

module.exports = mongoose.model('Order', orderSchema);