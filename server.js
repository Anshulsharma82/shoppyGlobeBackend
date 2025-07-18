import express from 'express'
import { dbCall} from './database/dbConnection.js'
import productRouter from './routes/product.routes.js'
import cartRouter from './routes/cart.routes.js'
import userRouter from './routes/user.routes.js'
import isLoggedIn from './middleware/isLoggedIn.js'
import dotenv from 'dotenv'

dotenv.config(['.env'])
const app = express()

app.use(express.json())
app.use('/', userRouter)
app.use('/products', productRouter)
app.use('/cart', isLoggedIn, cartRouter)

const PORT = process.env.PORT || 8001
app.listen(PORT, async () => {
    try {
        await dbCall()
        console.log('DB Connected')
    } catch (error) {
        console.log('Some error occured while connecting to DB', error)
    }
    console.log(`Server is running on ${PORT}...`)
})