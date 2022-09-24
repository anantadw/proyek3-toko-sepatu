const router = require('express').Router()
const productController = require('../controllers/ProductController')
const productMiddleware = require('../middleware/product');

router.get('/get-products', productController.getProducts)

router.post('/add-product', productMiddleware, productController.addProduct)

router.get('/show-product/:productId', productController.showProduct)

router.delete('/delete-product/:productId', productController.deleteProduct)

router.patch('/update-product/:productId', productMiddleware, productController.updateProduct)

module.exports = router