const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 5
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        max: 999
    },
    detail: {
        type: String,
        trim: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Product', ProductSchema)