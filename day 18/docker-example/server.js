import express from 'express'

import './database/database.js'

const server = express()
const PORT = process.env.PORT || 3000

server.get('/', (req, res) => {
    res.send('Index page')
})

server.listen(PORT, () => {
    console.log(`Server is running at PORT=${PORT}`)
})
