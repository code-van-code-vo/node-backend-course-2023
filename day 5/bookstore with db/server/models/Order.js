import { DataTypes } from 'sequelize'

import SQLModel from '../common/SQLModel.js'
import sequelize from '../database/database.js'
import User from './User.js'

const tableName = 'orders'

const Order = sequelize.define(tableName, {
    ...SQLModel,
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
})

User.hasMany(Order)
Order.belongsTo(User)

Order.sync().then(() => {
    console.log(`${tableName} table created successfully!`)
})

export default Order
