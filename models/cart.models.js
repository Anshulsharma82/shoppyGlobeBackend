import mongoose from "mongoose";

const schema = mongoose.Schema({
    productId: {
        type: mongoose.Types.ObjectId,
        ref: 'product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    name: {
        type: String, 
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

export const cartModel = mongoose.model('Cart', schema)