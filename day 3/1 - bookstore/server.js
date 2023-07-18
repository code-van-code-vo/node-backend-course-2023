import express from 'express'
import bodyParser from 'body-parser'
import { getBooks, findBookById, addBook, updateBook, deleteBookById } from './bookstore.js'
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
    const book = findBookById(bookId)
    if (!book) {
        res.status(404).send('Book not found')
    } else {
        res.send(book)
    }
})

server.post('/books', (req, res) => {
    const book = req.body
    if (book?.id && book?.title && book?.author) {
        addBook(req.body)
        res.send('Book Added')
    } else {
        res.status(400).send('Missing field')
    }
})

server.put('/books', (req, res) => {
    updateBook(req.body)
    res.send('Book updated')
})

server.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id)
    deleteBookById(bookId)
    res.send('Book deleted')
})

server.listen(PORT, () => {
    console.log('Server is running')
})