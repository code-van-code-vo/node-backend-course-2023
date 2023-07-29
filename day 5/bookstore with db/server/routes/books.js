import express from 'express'

import Book from '../models/Book.js'
import { DataResponse, NotFoundResponse } from '../common/reponses.js'

const router = express.Router()

router.get('/', async (req, res) => {
    const books = await Book.findAll()
    res.json(DataResponse(books))
})

router.get('/:id', async (req, res) => {
    const bookId = parseInt(req.params.id)

    const book = await Book.findOne({
        where: { id: bookId }
    })
    if (book) {
        res.json(DataResponse(book))
    } else {
        res.json(NotFoundResponse())
    }
})

router.post('/', async (req, res) => {
    const bookData = req.body

    const book = await Book.create(bookData)
    res.json(DataResponse(book))
})

export default router
