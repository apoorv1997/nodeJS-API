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
    dateAddded: {
        type: Date
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
    isAddedToCart: {
        type: Boolean,
        default: false
    },
})

let Cart = new Schema({
    id: {
        type: String
    }
})

mongoose.model('Product', productSchema);
mongoose.model('Cart', Cart);