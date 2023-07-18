const express = require('express')

const server = express()
const PORT = 3000

// req: request
// res: response
server.get('/', (req, res) => {
    res.send('Welcome to my server')
})

server.listen(PORT, () => {
    console.log('Server is running')
})