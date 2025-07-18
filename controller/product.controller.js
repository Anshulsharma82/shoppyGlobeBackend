import { productModel } from "../models/product.models.js"
import mongoose from "mongoose"

async function fetchProducts(req,res) {
    try {
        const products = await productModel.find({})
        res.status(200).json({
            products,
            msg: 'All products fetched succesfully'
        })
    } catch (error) {
        console.log('Error in fetch products API', error)
        res.status(500).json({msg: 'Internal Server Error'})
    }
}

async function addProducts(req,res) {
    const requestBody = req.body.products ;
    try {
        const transformedProduct = requestBody.map((item) => {
            const {title, stock, ...rest} = item
            return {
                ...rest,
                name: item.title,
                stockQuantity: stock
            }
        })
        const data = await productModel.insertMany(transformedProduct)
        res.status(201).json({
            msg: 'added successfully'
        })
    } catch (error) {
        console.log('Error while adding products::::::::::', error)
        res.status(500).json({
            msg: 'Internal Server Error'
        })
    }
}

async function fetchAProductById(req,res) {
    try {
        const {id} = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'ID should be a valid ObjectId'
            })
        }
        const response = await productModel.findById(id)
        if(!response) {
            res.status(404).json({
                msg: 'No product found for provided Id'
            })
        }
        res.status(200).json(response)

    } catch (error) {
        console.log('Error while fetching a product by ID', error)
        res.status(500).json({
            msg: 'Internal Server Error'
        })
    }
}

export { fetchProducts, addProducts, fetchAProductById }