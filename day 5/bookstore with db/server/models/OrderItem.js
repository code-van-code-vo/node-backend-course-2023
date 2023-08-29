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
        allowNull: false,
        references: {
            model: Order,
            key: 'id',
        }
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Book,
            key: 'id',
        }
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    }
})

Order.hasMany(OrderItem, {
    as: 'items'
})
OrderItem.belongsTo(Order)

Book.hasMany(OrderItem)
OrderItem.belongsTo(Book)

OrderItem.sync().then(() => {
    console.log(`${tableName} table created successfully!`)
})

export default OrderItem
