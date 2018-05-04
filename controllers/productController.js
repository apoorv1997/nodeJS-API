const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');

const ProdModel = mongoose.model('Product')

let getAllProducts = (req, res) => {
    ProdModel.find().select('-__v -_id').lean().exec((err, result) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else if (result == undefined || result == null || result == '') {
            console.log("No Product Found")
            res.send("No Product Found")
        } else {
            res.send(result)
        }
    })
}

let viewProduct = (req, res) => {
    ProdModel.findOne({ 'productId': req.params.productId }, (err, result) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else if (result == undefined || result == null || result == '') {
            console.log("No Product Found")
            res.send("No Product Found")
        } else {
            res.send(result)
        }
    })
}

let createProduct = (req, res) => {
    var today = Date.now()
    let productId = shortid.generate()

    let newProduct = new ProdModel({
        productId: productId,
        productName: req.body.productName,
        productType: req.body.productType,
        isAvailable: true,
        productRating: req.body.productRating,
        productPrice: req.body.productPrice,
        productReview: req.body.productReview
    })
    newProduct.save((err, result) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            res.send(result)
        }
    })
}

let increaseQuantity = (req, res) => {
    ProdModel.findOne({ 'productId': req.params.productId }, (err, result) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else if (result == undefined || result == null || result == '') {
            console.log("No Product Found")
            res.send("No product Found")
        } else {
            result.productQuantity += 1;
            result.save(function(err, result) {
                if (err) {
                    console.log(err)
                    res.send(err)
                } else {
                    console.log("Quantity updated")
                    res.send(result)
                }
            });
        }
    });
}

let deleteProduct = (req, res) => {
    ProdModel.remove({ 'productId': req.params.productId }, (err, result) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else if (result == undefined || result == null || result == '') {
            console.log("No product found");
            res.send("No product found");
        } else {
            res.send(result)
        }
    })
}

let editProduct = (req, res) => {
    let options = req.body;
    ProdModel.update({ 'productId': req.params.productId }, options, { multi: true }).exec((err, result) => {
        if (err) {
            res.send(err)
        } else if (result == undefined || result == null || result == '') {
            res.send("No product found");
        } else {
            res.send(result)
        }
    })
}

module.exports = {
    createProduct: createProduct,
    getAllProducts: getAllProducts,
    increaseQuantity: increaseQuantity,
    viewProduct: viewProduct,
    deleteProduct: deleteProduct,
    editProduct: editProduct
}