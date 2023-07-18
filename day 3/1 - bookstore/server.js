import express from 'express'
import { getBooks } from './bookstore.js' 

const server = express()
const PORT = 3000

// req: request
// res: response
server.get('/', (req, res) => {
    res.send('Welcome to my server')
})

server.get('/books', (req, res) => {
    res.send(getBooks())
})

server.listen(PORT, () => {
    console.log('Server is running')
})