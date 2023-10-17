import { DataTypes } from 'sequelize'

import SQLModel from '../../common/SQLModel.js'
import sequelize from '../../database/database.js'

const tableName = 'users'

export const User = sequelize.define(tableName, {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user'
    },
    ...SQLModel,
})

User.sync().then(() => {
    console.log(`${tableName} table created successfully!`)
})
