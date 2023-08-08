import express from 'express'
import { DataResponse, MessageResponse } from '../common/reponses.js'
import { requireRole } from '../middlewares/auth.js'
import Order from '../models/Order.js'
import OrderItem from '../models/OrderItem.js'

const router = express.Router()

router.post('/', requireRole('user'), async (req, res) => {
    const orderData = req.body
    const userId = res.locals.userData.id

    const order = await Order.create({
        userId: userId,
    })

    orderData.items.forEach(item => {
        OrderItem.create({
            orderId: order.id,
            bookId: item.bookId,
            amount: item.amount,
        })
    })

    res.json(DataResponse({
        orderId: order.id,
    }))
})

export default router
