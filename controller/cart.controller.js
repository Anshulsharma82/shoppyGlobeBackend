import mongoose from "mongoose"
import { cartModel } from "../models/cart.models.js"
import { productModel } from "../models/product.models.js"

async function addItemToCart(req, res) {
    try {
        const requestBody = req.body
        const { productId } = requestBody
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                msg: 'productId should be a valid ObjectId'
            })
        }
        const doesProductExist = await productModel.findById(productId)
        if (!doesProductExist) {
            return res.status(404).json({
                msg: 'No product found for provided productId'
            })
        }
        const cartData = await cartModel.insertOne(requestBody)
        res.status(201).json({
            cartData,
            msg: 'Item added to cart successfully!'
        })
    } catch (error) {

        const formattedError = Object.values(error.errors).map((err) => {
            return {
                field: err.path,
                message: err.message
            }
        })

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                msg: 'Validation failed',
                err: formattedError
            })
        }
        res.status(500).json({ msg: 'Internal Server Error' })
    }

}

async function updateItemsQuantityInCart(req, res) {
    const { id } = req.params;
    const { quantity } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'ID should be a valid ObjectId'
            })
        }
        if (!quantity || typeof (quantity) !== 'number') {
            return res.status(400).json({
                msg: 'Quantity is a required field and should be of type number'
            })
        }
        const itemData = await cartModel.findOne({ _id: id })
        if (!itemData) {
            return res.status(404).json({
                msg: 'No product found for provided Id'
            })
        }
        const updatedQuantity = itemData['quantity'] + (quantity)
        const data = await cartModel.findOneAndUpdate({ _id: id },
            {
                $set: { "quantity": updatedQuantity }
            }, 
            {
            new: true
            }
        )
        return res.status(200).json({ 
            data,
            msg: 'Quantity updated Successfully'
         })
    } catch (error) {
        console.log('Error while updating quantity in cart', error)
        return res.status(500).json({ msg: 'Internal Server Error' })
    }
}

async function removeProductFromCart(req, res) {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'ID should be a valid ObjectId'
            })
        }
        const productInCart = await cartModel.findById(id)
        if (!productInCart) {
            return res.status(404).json({
                msg: 'No product found for the provided detail'
            })
        }
        await cartModel.findByIdAndDelete(id)
        res.status(200).json({
            msg: 'Product removed from the cart!'
        })
    } catch (error) {

        res.status(500).json({ msg: 'Internal Server Error' })
    }
}

export {
    addItemToCart,
    updateItemsQuantityInCart,
    removeProductFromCart
}