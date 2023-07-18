import express from 'express'
import bodyParser from 'body-parser'
import { getBooks, findBookById, addBook } from './bookstore.js'
// const express = require('express')
// const { getBooks } = require('./bookstore.js')

const server = express()
const PORT = 3000

server.use(bodyParser.json())

// req: request
// res: response
server.get('/', (req, res) => {
    res.send('Welcome to my server')
})

server.get('/books', (req, res) => {
    res.send(getBooks())
})

server.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id)
    res.send(findBookById(bookId))
})

server.post('/books', (req, res) => {
    console.log(req.body)
    addBook(req.body)
    res.send('Book Added')
})

server.listen(PORT, () => {
    console.log('Server is running')
})