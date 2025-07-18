import express from 'express'
import { addItemToCart, updateItemsQuantityInCart, removeProductFromCart } from '../controller/cart.controller.js';
const router = express.Router()


router.post('/', addItemToCart)
router.put('/:id', updateItemsQuantityInCart)
router.delete('/:id', removeProductFromCart)

export default router;