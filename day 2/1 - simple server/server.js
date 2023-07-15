const express = require('express')

const server = express()
const PORT = 3000

server.get('/', (request, response) => {
    console.log('new user came')
    response.send('Welcome to my website')
})
server.get('/about', (request, response) => {
    response.send('This is about page')
})

server.listen(PORT, () => {
    console.log('Server is running')
})