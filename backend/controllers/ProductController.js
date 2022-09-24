const Product = require('../models/Product')
const { validationResult } = require('express-validator')
const fs = require('fs')
const path = require('path')

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

    const data = {
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        detail: (req.body.detail && req.body.detail !== '') ? req.body.detail : undefined,
        image: (req.file) ? req.file.path : undefined
    }
    const newProduct = new Product(data)

    try {
        const addedProduct = await newProduct.save()

        res.status(201).json({
            message: 'Product added successfully',
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
        const product = await Product.findById(req.params.productId)
        if (!product) {
            return res.status(404).json({
                message: 'No data with given id'
            })
        }

        if (product.image) {
            const filePath = path.join(__dirname, '../', product.image)
            fs.unlink(filePath, (error) => console.log(error))
        }

        const deletedProduct = await Product.findByIdAndDelete(req.params.productId)

        res.status(200).json({
            message: 'Product deleted successfully'
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
        const product = await Product.findById(req.params.productId)
        if (!product) {
            return res.status(404).json({
                message: 'No data with given id'
            })
        }

        const oldImage = product.image
        product.name = req.body.name
        product.price = req.body.price
        product.stock = req.body.stock
        product.detail = (req.body.detail && req.body.detail !== '') ? req.body.detail : undefined
        product.image = (req.file) ? req.file.path : undefined

        if (oldImage) {
            const filePath = path.join(__dirname, '../', oldImage)
            fs.unlink(filePath, (error) => console.log(error))
        }

        await product.save()

        res.status(200).json({
            message: 'Product updated successfully'
            // updatedProduct: product
        })
    } catch (error) {
        res.status(500).json({
            message: 'Failed to delete product: ' + error.message
        })
    }
}

module.exports = {getProducts, addProduct, showProduct, deleteProduct, updateProduct}