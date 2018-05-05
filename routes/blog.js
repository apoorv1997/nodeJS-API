const express = require('express');
const router = express.Router();
const prodController = require('./../controllers/productController');
const appConfig = require('./../config/appConfig')

let setRouter = (app) => {
    let baseUrl = appConfig.apiVersion + '/Product';

    app.get(baseUrl + '/all', prodController.getAllProducts);
    /**
	 * @api {get} /api/v1/Product/all Get all products
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  
		{
						"productName": "string",
						"productType": "string",
						"productRating": number,
						"isAvailable": boolean,
						"isAddedToCart": boolean,
                        "productId": "string",
						"productQuantity": number,
						"productPrice": number,
		}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find Blog Details",
	    "status": 500,
	    "data": null
	   }
	 */
    app.get(baseUrl + '/views/:productId', prodController.viewProduct);
    /**
	 * @api {get} /api/v1/Product/view/:productId Get a single product
	 * @apiVersion 0.0.1
	 * @apiGroup view
	 *
	 * @apiParam {String} productId The productId should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    			"productName":"string",
	    			"__v": number,
				    "productType": "string",
					"productRating":number,
					"productReview":"string",
					"isAvailable":boolean,
					"productId":"string",
					"productPrice":number,
					"__id": number
		}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */
    app.post(baseUrl + '/create', prodController.createProduct);
    /**
	 * @api {post} /api/v1/Product/create Create a product
	 * @apiVersion 0.0.1
	 * @apiGroup create
	 *
	 * @apiParam {String} productName Name of the product passed as a body parameter
	 * @apiParam {String} productType type of the product passed as a body parameter
	 * @apiParam {Number} productRating rating of the product passed as a body parameter
	 * @apiParam {String} productQuantity quantity of the product passed as a body parameter
     * @apiParam {Number} productPrice price of the product passed as a body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
            "productName":"string",
            "productType":"string",
            "productRating":number,
            "productReview":"string",
            "productId":"string",
            "productQuantity":number,
            "productPrice":number,
            "isAddedToCart":boolean

		}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */
    app.post(baseUrl + '/:productId/delete', prodController.deleteProduct);
    /**
	 * @api {post} /api/v1/Product/:blogId/delete Delete a product by productId
	 * @apiVersion 0.0.1
	 * @apiGroup delete
	 *
	 * @apiParam {String} productId productID of the product passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
        "n":1,
        "ok":1
		}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

    app.put(baseUrl + '/:productId/edit', prodController.editProduct);
    /**
	 * @api {put} /api/v1/Product/:productId/edit Edit product by productId
	 * @apiVersion 0.0.1
	 * @apiGroup edit
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} productId productID of the product passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  
					{
                        "productName":"string",
                        "productType":"string",
                        "productRating":number,
                        "productReview":"string",
                        "isAvailable":boolean,
                        "isAddedToCart":boolean
                    }
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */
    app.get(baseUrl + '/:productId/count/views', prodController.increaseQuantity);
    app.get(baseUrl + '/:productId/addtocart', prodController.addedToCart);
    /**
	 * @api {get} /api/v1/Product/:productId/addtocart AddToCart product by productId
	 * @apiVersion 0.0.1
	 * @apiGroup add a product
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} blogId blogId of the blog passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
            "isAddedToCart":true
        }
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

    app.get(baseUrl + '/:productId/removefromcart', prodController.removeFromCart);
    /**
	 * @api {get} /api/v1/Product/:productId/removefromcart Remove product by productId
	 * @apiVersion 0.0.1
	 * @apiGroup remove a product
	 *
	 * @apiParam {String} productId productId of the product passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
            "isAddedToCart":false
        }
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

}
module.exports = {
    setRouter: setRouter
}