import express from 'express'
import { getBooks, findBookById } from './bookstore.js'
// const express = require('express')
// const { getBooks } = require('./bookstore.js')

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

server.get('/books/:id', (req, res) => {
    console.log(req.params)
    const bookId = req.params.id
    res.send(findBookById(bookId))
})

server.listen(PORT, () => {
    console.log('Server is running')
})