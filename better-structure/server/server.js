// ===== Imports =====
import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import './database/database.js'
import { overwriteResponseJSON } from './common/middleware/overwriteResponseJSON.middleware.js'

import indexRouter from './module/index/index.router.js'
import userRouter from './module/user/user.router.js'

// ===== Config =====
const server = express()
const PORT = process.env.PORT || 3000

// ===== Middlewares =====
server.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(cookieParser())
server.use(overwriteResponseJSON)

// ===== Routes =====
server.use('/', indexRouter)
server.use('/users', userRouter)

server.listen(PORT, () => {
    console.log(`Server is listening at PORT=${PORT}`)
})
