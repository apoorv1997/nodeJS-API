const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
const response = require('./../libs/responseLib')
const check = require('./../libs/checkLib')
const ProdModel = mongoose.model('Product')
const CartModel = mongoose.model('Cart')
let getAllProducts = (req, res) => {
    ProdModel.find().select('-__v -_id').lean().exec((err, result) => {
        if (err) {
            console.log(err)
            let apiResponse = response.generate(true, 'Failed to find product details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            let apiResponse = response.generate(true, 'No product Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'All Product details found', 200, result)
            res.send(apiResponse)
        }
    })
}

let viewProduct = (req, res) => {
    ProdModel.findOne({ 'productId': req.params.productId }, (err, result) => {
        if (err) {
            let apiResponse = response.generate(true, 'Failed to find product details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            let apiResponse = response.generate(true, 'No product Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'All Product details found', 200, result)
            res.send(apiResponse)
        }
    })
}

let createProduct = (req, res) => {
    var today = Date.now()
    let productId = shortid.generate()

    let newProduct = new ProdModel({
        productId: productId,
        dateAdded: today,
        productName: req.body.productName,
        productType: req.body.productType,
        isAvailable: true,
        isAddedToCart: false,
        productQuantity: req.body.productQuantity,
        productRating: req.body.productRating,
        productPrice: req.body.productPrice,
        productReview: req.body.productReview
    })
    newProduct.save((err, result) => {
        if (err) {
            let apiResponse = response.generate(true, 'Failed to find product details', 500, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'All Product details found', 200, result)
            res.send(apiResponse)
        }
    })
}

let addedToCart = (req, res) => {
    ProdModel.findOne({ 'productId': req.params.productId }, (err, result) => {

        console.log(req.params.productId);
        let cartItem = new CartModel({
                id: req.params.productId
            })
            /*if (err) {
                res.send(err)
                console.log(err)
            } else if (result == undefined || result == null || result == '') {
                console.log("No product found");
                res.send("No product fond");
            } else {
                result.isAddedToCart = true;
                result.save(function(err, result) {
                    if (err) {
                        res.send(err)
                        console.log(err)
                    } else {
                        res.send(result)
                    }
                })
            }*/
        cartItem.save((err, result) => {
            if (err) {
                let apiResponse = response.generate(true, 'Failed to find product details', 500, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'item added to cart', 200, result)
                res.send(apiResponse)
            }
        })
    })
}

let getAllCart = (req, res) => {
    CartModel.find().select('-__v -_id').lean().exec((err, result) => {
        if (err) {
            let apiResponse = response.generate(true, 'Failed to find product details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            let apiResponse = response.generate(true, 'Failed to find product details', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Cart details', 200, result)
            res.send(apiResponse)
        }
    })
}

let removeFromCart = (req, res) => {
    CartModel.remove({ 'id': req.params.productId }, (err, result) => {
        console.log(req.params.productId)
        if (err) {
            console.log(err)
            res.send(err)
        } else if (check.isEmpty(result)) {
            console.log("No product found");
            res.send("No product found");
        } else {
            res.send(result)
        }
    })
}

let increaseQuantity = (req, res) => {
    ProdModel.findOne({ 'productId': req.params.productId }, (err, result) => {
        if (err) {
            let apiResponse = response.generate(true, 'Failed to find product details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            let apiResponse = response.generate(true, 'Failed to find product details', 404, null)
            res.send(apiResponse)
        } else {
            result.productQuantity += 1;
            result.save(function(err, result) {
                if (err) {
                    let apiResponse = response.generate(true, 'Failed to find product details', 500, null)
                    res.send(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Failed to find product details', 200, result)
                    res.send(apiResponse)
                }
            });
        }
    });
}


let deleteProduct = (req, res) => {
    ProdModel.findOne({ 'productId': req.params.productId }, (err, result) => {
        if (err) {
            let apiResponse = response.generate(true, 'Failed to find product details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            let apiResponse = response.generate(true, 'Failed to load product details', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'product deleted', 200, result)
            res.send(apiResponse)
        }
    })
}

let editProduct = (req, res) => {
    let options = req.body;
    ProdModel.update({ 'productId': req.params.productId }, options, { multi: true }).exec((err, result) => {
        if (err) {
            let apiResponse = response.generate(true, 'Failed to find product details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            let apiResponse = response.generate(true, 'Failed to load product details', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'product edited', 200, result)
            res.send(apiResponse)
        }
    })
}

module.exports = {
    createProduct: createProduct,
    getAllProducts: getAllProducts,
    increaseQuantity: increaseQuantity,
    viewProduct: viewProduct,
    deleteProduct: deleteProduct,
    editProduct: editProduct,
    addedToCart: addedToCart,
    removeFromCart: removeFromCart,
    getAllCart: getAllCart
}