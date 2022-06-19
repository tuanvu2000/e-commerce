const mongoose = require('mongoose');
const { schemaOptions } = require('./modelOptions');

const productSchema = new mongoose.Schema({
    namePd: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    sale: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        required: true
    },
    cloudinaryId: {
        type: String,
        required: true
    },
    size: {
        type: String
    },
    weight: {
        type: Number,
        default: 0
    },
    color: {
        type: String
    },
    hatMaterial: {
        type: String
    },
    porousMaterial: {
        type: String
    },
    liningMaterial: {
        type: String
    },
    earCover: {
        type: String
    },
    madeIn: {
        type: String
    },
    brand: {
        type: String
    },
    warranty: {
        type: String
    },
    timeChangeError: {
        type: String
    },
    transportFee: {
        type: Number
    },
    transportFeeFast: {
        type: Number
    },
    washingHat: {
        type: String
    },
    inventory: {
        type: Number,
        required: true,
        default: 0
    },
    quantitySell: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    },
    content: {
        type: String
    }
}, schemaOptions);

module.exports = mongoose.model('Product', productSchema);