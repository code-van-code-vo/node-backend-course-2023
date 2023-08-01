import express from 'express'
import { MessageResponse, DataResponse, Response } from '../common/reponses.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.send('fdsfa')
})

export default router
