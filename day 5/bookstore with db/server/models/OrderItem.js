import { DataTypes } from 'sequelize'

import SQLModel from '../common/SQLModel.js'
import sequelize from '../database/database.js'
import Order from './Order.js'
import Book from './Book.js'

const tableName = 'order_items'

const OrderItem = sequelize.define(tableName, {
    ...SQLModel,
    orderId: {
        type: DataTypes.INTEGER,
        references: {
            model: Order,
            key: 'id',
        }
    },
    bookId: {
        type: DataTypes.INTEGER,
        references: {
            model: Book,
            key: 'id',
        }
    },
    amount: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    }
})

Order.hasMany(OrderItem, {
    as: 'items'
})
OrderItem.belongsTo(Order)

Book.hasMany(OrderItem)
OrderItem.belongsTo(Book)

sequelize.sync().then(() => {
    console.log(`${tableName} table created successfully!`)
})

export default OrderItem
