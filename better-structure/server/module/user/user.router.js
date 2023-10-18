import express from 'express'
import bcrypt from 'bcrypt'

import { DataResponse, NotFoundResponse, MessageResponse, InternalErrorResponse, UnauthorizedResponse, ErrorResponse } from '../../common/responses.js'
import { decrypt } from '../../common/utils/crypto.helper.js'
import { User } from './user.model.js'
import { requireRole } from '../../common/middleware/auth.middleware.js'
import { setUserJWT } from './user.helper.js'
import { loginValidation, registerValidation } from './user.validation.js'
import { fieldValidator } from '../../common/middleware/fieldValidator.middleware.js'
import { findUser, getAllUsers, register, sendRegisterEmail } from './user.service.js'
import { paginationValidation } from '../../common/validation/pagination.validation.js'

const router = express.Router()

router.get('/', fieldValidator(paginationValidation), async (req, res) => {
    const page = req.query.page
    const limit = req.query.limit

    const users = await getAllUsers(page, limit)
    res.json(DataResponse(users, { page, limit }))
})

router.post('/register', fieldValidator(registerValidation), async (req, res) => {
    const userData = req.body

    try {
        const user = await findUser({
            username: userData.username,
            email: userData.email,
        })
        if (user) {
            res.json(ErrorResponse(400, 'username or email already exist'))
            return;
        }
        sendRegisterEmail(userData.username, userData.email, userData.password)
    } catch(err) {
        console.log(err)
        res.json(InternalErrorResponse())
    }
})

router.get('/confirm_register', async (req, res) => {
    const code = req.query.code

    try {
        const data = decrypt(code)
        const user = register(data)

        setUserJWT(res, user)
        res.redirect(process.env.CLIENT_URL)

    } catch(err) {
        res.json(InternalErrorResponse())
    }
})

router.post('/login', fieldValidator(loginValidation), async (req, res) => {
    const userData = req.body
    console.log(userData)

    const user = await findUser({
        username: userData.username,
        email: userData.username,
    })

    const isMatchPassword = await bcrypt.compare(
        userData.password,
        user?.password || ''
    )
    if (isMatchPassword) {
        const token = setUserJWT(res, user)
        res.json(DataResponse({ token }))
    } else {
        res.json(UnauthorizedResponse('Invalid username or password'))
    }
})

router.delete('/:id', requireRole('admin'), async (req, res) => {
    const id = parseInt(req.params.id)

    const result = await User.destroy({
        where: { id }
    })
    if (result === 0) {
        res.json(NotFoundResponse())
    } else {
        res.json(MessageResponse('User deleted'))
    }
})

router.get('/:id', requireRole('admin'), async (req, res) => {
    const id = parseInt(req.params.id)

    const user = await findUser({ id })
    res.json(DataResponse(user))
})

export default router
