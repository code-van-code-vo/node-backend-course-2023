// ===== Imports =====
import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import './database/database.js'

import indexRouter from './routes/index.js'
import bookRouter from './routes/books.js'
import userRouter from './routes/users.js'
import orderRouter from './routes/orders.js'

// ===== Config =====
const server = express()
const PORT = process.env.PORT || 3000

// ===== Middlewares =====
server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(cookieParser())
server.use('/public', express.static('public'))
server.use('/public', express.static('public/images'))

// ===== Routes =====
server.use('/', indexRouter)
server.use('/books', bookRouter)
server.use('/users', userRouter)
server.use('/orders', orderRouter)

server.listen(PORT, () => {
    console.log(`Server is listening at PORT=${PORT}`)
})
