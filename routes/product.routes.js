import express from 'express'
import { fetchProducts, addProducts, fetchAProductById } from '../controller/product.controller.js'
const router = express.Router()

router.get('/', fetchProducts)

router.get('/:id', fetchAProductById)

router.post('/', addProducts)

export default router