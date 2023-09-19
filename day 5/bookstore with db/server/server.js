// ===== Imports =====
import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth2'

import './database/database.js'

import overwriteResponseJSON from './middlewares/overwriteResponseJSON.js'
import indexRouter from './routes/index.js'
import bookRouter from './routes/books.js'
import userRouter from './routes/users.js'
import orderRouter from './routes/orders.js'
import authRouter from './routes/auth.js'

// ===== Config =====
const server = express()
const PORT = process.env.PORT || 3000

// ===== Middlewares =====
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_URL}/auth/google/callback`
}, (req, accessToken, refreshToken, profile, done) => {
    done(null, profile)
}))
server.use(passport.initialize())
server.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(cookieParser())
server.use(overwriteResponseJSON)
server.use('/public', express.static('public'))
server.use('/public', express.static('public/images'))

// ===== Routes =====
server.use('/', indexRouter)
server.use('/books', bookRouter)
server.use('/users', userRouter)
server.use('/orders', orderRouter)
server.use('/auth', authRouter)

server.listen(PORT, () => {
    console.log(`Server is listening at PORT=${PORT}`)
})
