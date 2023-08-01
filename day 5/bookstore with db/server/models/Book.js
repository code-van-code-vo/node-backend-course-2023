import { Sequelize, DataTypes } from 'sequelize'
import sequelize from '../database/database.js'

import SQLModel from '../common/SQLModel.js'

// books: table name that Book mapping to
const Book = sequelize.define('books', {
    ...SQLModel,
    title: {
        type: DataTypes.STRING(511),
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING(511),
        allowNull: true,
    },
    summary: {
        type: DataTypes.STRING(511),
        allowNull: true,
    },
})

Book.sync().then(() => {
    console.log('books table created')
})

export default Book