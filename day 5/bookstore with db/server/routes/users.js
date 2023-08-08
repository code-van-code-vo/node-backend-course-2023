import express from 'express'

import User from '../models/User.js'
import { DataResponse, NotFoundResponse, MessageResponse, InternalErrorResponse } from '../common/reponses.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.get('/', async (req, res) => {
    const users = await User.findAll()
    res.json(DataResponse(users))
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

router.post('/register', async (req, res) => {
    const userData = req.body

    try {
        const hashPassword = await bcrypt.hash(userData.password, 10)
        const user = await User.create({
            username: userData.username,
            password: hashPassword,
        })
        console.log(user)
        res.json(DataResponse(user))
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
    } else {
        res.json(MessageResponse('Invalid username or password'))
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

export default router
