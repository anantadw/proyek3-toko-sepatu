const Product = require('../models/Product')
const { validationResult } = require('express-validator')

const getProducts = async (req, res) => {
    try {
        const results = await Product.find()

        res.status(200).json({
            message: 'Success',
            products: results
        })
    } catch (error) {
        res.status(500).json({
            message: 'Failed: ' + error.message
        })
    }
}

const addProduct = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Failed',
            erros: errors.array()
        })
    }

    const newProduct = new Product(req.body)

    try {
        const addedProduct = await newProduct.save()

        res.status(201).json({
            message: 'Product added successfully'
            // addedProduct: addedProduct
        })
    } catch (error) {
        res.status(500).json({
            message: 'Failed to add product: ' + error.message
        });
    }
}

const showProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId)
        let status, message

        if (product === null) {
            status = 404
            message = 'No data with given id'
        } else {
            status = 200
            message = 'Success'
        }

        res.status(status).json({
            message: message,
            product: product
        })
    } catch (error) {
        res.status(500).json({
            message: 'Failed: ' + error.message
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.productId)
        let status, message

        if (deletedProduct === null) {
            status = 404
            message = 'No data with given id'
        } else {
            status = 200
            message = 'Product deleted successfully'
        }

        res.status(status).json({
            message: message
            // deletedProduct: deletedProduct
        })
    } catch (error) {
        res.status(500).json({
            message: 'Failed to delete product: ' + error.message
        })
    }
}

const updateProduct = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Failed',
            erros: errors.array()
        })
    }
    
    try {
        const options = {new: true}
        const product = await Product.findByIdAndUpdate(req.params.productId, req.body, options)
        let status, message

        if (product === null) {
            status = 404
            message = 'No data with given id'
        } else {
            status = 200
            message = 'Product updated successfully'
        }

        res.status(status).json({
            message: message
            // updatedProduct: product
        })
    } catch (error) {
        res.status(500).json({
            message: 'Failed to delete product: ' + error.message
        })
    }
}

module.exports = {getProducts, addProduct, showProduct, deleteProduct, updateProduct}