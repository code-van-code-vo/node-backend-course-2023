import express from 'express'
import { DataResponse, MessageResponse } from '../../common/responses.js'
import { requireRole } from '../../common/middleware/auth.middleware.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.json(MessageResponse('Welcome to my server'))
})

router.get('/whoami', requireRole('user'), (req, res) => {
    const userData = res.locals.userData

    res.json(DataResponse(userData))
})

export default router
