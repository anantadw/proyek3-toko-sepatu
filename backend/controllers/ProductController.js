const Product = require('../models/Product')

const getProducts = async (req, res) => {
    try {
        const results = await Product.find()

        res.status(200).json({
            message: 'Success',
            products: results
        })
    } catch (error) {
        res.status(400).json({
            message: 'Failed',
            error: 'Error: ' + error
        })
    }
}

const addProduct = (req, res) => {
    const newProduct = new Product(req.body)

    newProduct.save()
        .then(product => {
            res.status(201).json({
                message: 'Product successfully added',
                product: product
            });
        })
        .catch(error => {
            res.status(400).json({
                message: 'Failed to add product: ' + error
            });
        })
}

const showProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId)

        res.status(200).json({
            message: 'Success',
            product: product
        })
    } catch (error) {
        res.status(400).json({
            message: 'Failed',
            error: 'Error: ' + error
        })
    }
}

module.exports = {getProducts, addProduct, showProduct}