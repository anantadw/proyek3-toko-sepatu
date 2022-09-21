const router = require('express').Router()
const productController = require('../controllers/ProductController')

router.get('/get-products', productController.getProducts)

router.post('/add-product', productController.addProduct)

router.get('/show-product/:productId', productController.showProduct)

router.delete('/delete-product/:productId', productController.deleteProduct)

router.patch('/update-product/:productId', productController.updateProduct)

module.exports = router