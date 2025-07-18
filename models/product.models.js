import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    stockQuantity: {
        type: Number,
        required: true
    }
})

export const productModel = mongoose.model('Product',schema)