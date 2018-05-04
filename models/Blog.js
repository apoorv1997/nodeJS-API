const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let productSchema = new Schema({
    productId: {
        type: String,
        unique: true
    },
    productName: {
        type: String,
        default: ''
    },
    productType: {
        type: String,
        default: ''
    },
    productRating: {
        type: Number,
        default: 0
    },
    productPrice: {
        type: Number,
        defaul: 0
    },
    productReview: {
        type: String,
        default: ''
    },
    productQuantity: {
        type: Number,
        defaul: 0
    },
    isAvailable: {
        type: Boolean,
        default: false
    },
})

mongoose.model('Product', productSchema);