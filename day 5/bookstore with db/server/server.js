// ===== Imports =====
import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import './database/database.js'

import indexRouter from './routes/index.js'
import bookRouter from './routes/books.js'

// ===== Config =====
const server = express()
const PORT = process.env.PORT || 3000

// ===== Middlewares =====
server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use('/public', express.static('public'))
server.use('/public', express.static('public/images'))

// ===== Routes =====
server.use('/', indexRouter)
server.use('/books', bookRouter)

server.listen(PORT, () => {
    console.log(`Server is listening at PORT=${PORT}`)
})
