import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { productRouter } from './routers/product'
import { seedRouter } from './routers/seedRouter'
import { userRouter } from './routers/user'
import { orderRouter } from './routers/order'
import { keyRouter } from './routers/key'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/online-store'

mongoose.set('strictQuery', true)

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB!');
    })
    .catch((error) => {
        console.log('Failed to connect to MongoDB: ' + error.message);
    })

const app = express()

app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173']
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', productRouter)
app.use('/api/seed', seedRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)
app.use('/api/keys', keyRouter)

const PORT = 4000

app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`)
})