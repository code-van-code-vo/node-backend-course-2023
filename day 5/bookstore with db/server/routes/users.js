import express from 'express'

import User from '../models/User.js'
import { DataResponse, NotFoundResponse, MessageResponse, InternalErrorResponse, ErrorResponse, UnauthorizedResponse } from '../common/reponses.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { encrypt, decrypt } from '../common/crypto.js'
import sendEmail from '../common/sendEmail.js'

const router = express.Router()

function sendToken(res, user) {
    const payload = {
        id: user.id,
        username: user.username,
        role: user.role,
    }
    const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: '3h'
    })
    res.cookie('token', token)
    res.json(DataResponse({
        token: token
    }))
}

router.get('/', async (req, res) => {
    const users = await User.findAll()
    res.json(DataResponse(users))
})

router.post('/register', async (req, res) => {
    const userData = req.body

    try {
        const hashPassword = await bcrypt.hash(userData.password, 10)
        const data = {
            email: userData.email,
            username: userData.username,
            password: hashPassword,
            iat: Date.now(),
        }
        const encrypted = encrypt(data)

        const confirmLink = `${process.env.SERVER_URL}/users/confirm_register?code=${encrypted}`
        sendEmail(data.email, 'Confirm register account at My Bookstore', `
            <h2>My Bookstore App</h2>
            <p>Click this link to register your account at My Bookstore:</p>
            <a href="${confirmLink}">${confirmLink}</a>
        `, () => {
            res.json(DataResponse('Check your email'))
        })
        // sendToken(res, user)
    } catch(err) {
        console.log(err)
        res.json(InternalErrorResponse())
    }
})

router.get('/confirm_register', async (req, res) => {
    const code = req.query.code

    try {
        const data = decrypt(code)

        if (Date.now() - data.iat > 5*60*1000) {
            res.json(UnauthorizedResponse())
            return;
        }
        const user = await User.create({
            email: data.email,
            username: data.username,
            password: data.password,
        })
        const payload = {
            id: user.id,
            username: user.username,
            role: user.role,
        }
        const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: '3h',
        })
        res.cookie('token', token)
        res.redirect(process.env.CLIENT_URL)

    } catch(err) {
        console.log(err)
        res.json(InternalErrorResponse())
    }

})

router.post('/login', async (req, res) => {
    const userData = req.body

    const user = await User.findOne({
        where: {
            username: userData.username
        }
    })
    if (user == null) {
        res.json(NotFoundResponse())
        return;
    }

    const isMatchPassword = await bcrypt.compare(
        userData.password,
        user.password
    )
    if (isMatchPassword) {
        sendToken(res, user)
    } else {
        res.json(ErrorResponse(401, 'Invalid username or password'))
    }
})

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id)

    const result = await User.destroy({
        where: {
            id: id,
        }
    })
    if (result === 0) {
        res.json(NotFoundResponse())
    } else {
        res.json(MessageResponse('user deleted'))
    }
})

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)

    const user = await User.findOne({
        where: {
            id: id,
        }
    })
    res.json(DataResponse(user))
})

export default router
