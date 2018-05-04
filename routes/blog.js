const express = require('express');
const router = express.Router();
const prodController = require('./../controllers/productController');
const appConfig = require('./../config/appConfig')

let setRouter = (app) => {
    let baseUrl = appConfig.apiVersion + '/Product';

    app.get(baseUrl + '/all', prodController.getAllProducts);
    app.get(baseUrl + '/views/:productId', prodController.viewProduct);
    app.post(baseUrl + '/create', prodController.createProduct);
    app.post(baseUrl + '/:productId/delete', prodController.deleteProduct);
    app.put(baseUrl + '/:productId/edit', prodController.editProduct);
    app.get(baseUrl + '/:productId/count/views', prodController.increaseQuantity);
}
module.exports = {
    setRouter: setRouter
}