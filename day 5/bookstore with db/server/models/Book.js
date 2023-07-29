import { DataTypes } from "sequelize"

import SQLModel from '../common/SQLModel.js'
import sequelize from "../database/database.js"

const Book = sequelize.define('books', {
    ...SQLModel,
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    summary: {
        type: DataTypes.STRING,
    },
})

sequelize.sync().then(() => {
    console.log('Book table created successfully!')
}).catch((error) => {
    console.error('Unable to create table : ', error)
})

export default Book
