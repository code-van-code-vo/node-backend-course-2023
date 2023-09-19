import express from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { DataResponse } from '../common/reponses.js'

const router = express.Router()

router.get('/google', passport.authenticate('google', {
    scope: ['email', 'profile'],
    session: false,
}))

router.get('/google/callback', passport.authenticate('google', {
    session: false,
}), async (req, res) => {
    const profile = req.user

    const [user, created] = await User.findOrCreate({
        where: { email: profile.email },
        defaults: {
            email: profile.email,
            username: profile.email,
            password: '',
        },
    })

    const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
    }
    const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: '3h'
    })
    res.cookie('token', token)
    res.redirect(process.env.CLIENT_URL)
})

export default router