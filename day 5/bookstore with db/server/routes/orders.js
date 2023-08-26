import express from 'express'
import { DataResponse, MessageResponse } from '../common/reponses.js'
import { requireRole } from '../middlewares/auth.js'
import Order from '../models/Order.js'
import OrderItem from '../models/OrderItem.js'
import User from '../models/User.js'
import Book from '../models/Book.js'

const router = express.Router()

router.get('/', requireRole('user'), async (req, res) => {
    const userId = res.locals.userData.id

    const user = await User.findOne({
        where: { id: userId },
        include: {
            model: Order,
            attributes: ['id', 'createdAt'],
            include: {
                model: OrderItem,
                as: 'items',
                attributes: ['amount', 'createdAt'],
                include: {
                    model: Book,
                }
            }
        }
    })
    res.json(DataResponse(user.orders))
})
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
