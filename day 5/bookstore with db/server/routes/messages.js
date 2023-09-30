import express from 'express'
import Message from '../models/Message.js'
import { DataResponse } from '../common/reponses.js'
import User from '../models/User.js'

const router = express.Router()

router.get('/:roomName', async (req, res) => {
    const messages = await Message.findAll({
        where: { roomName: req.params.roomName },

        include: {
            model: User,
            as: 'sender',
            attributes: ['id', 'username', 'role']
        }
    })
    console.log(messages)
    res.json(DataResponse(messages))
})

export default router
