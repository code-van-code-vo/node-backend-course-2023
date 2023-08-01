import express from 'express'
import { MessageResponse, DataResponse, Response, InternalErrorResponse, NotFoundResponse } from '../common/reponses.js'

import Book from '../models/Book.js'

const router = express.Router()

router.get('/', async (req, res) => {
    const books = await Book.findAll()
    res.json(DataResponse(books))
})

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)

    const book = await Book.findOne({
        where: {
            id: id,
        }
    })
    res.json(DataResponse(book))
})

router.post('/', async (req, res) => {
    const bookData = req.body

    try {
        const book = await Book.create(bookData)
        console.log(book)
        res.json(DataResponse(book))
    } catch(err) {
        console.log(err)
        res.json(InternalErrorResponse())
    }
})

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id)

    const result = await Book.destroy({
        where: {
            id: id,
        }
    })
    if (result === 0) {
        res.json(NotFoundResponse())
    } else {
        res.json(MessageResponse('book deleted'))
    }
})

router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const bookData = req.body

    const result = await Book.update(bookData, {
        where: {
            id: id
        },
    })
    if (result[0] === 0) {
        res.json(NotFoundResponse())
    } else {
        res.json(MessageResponse('book updated'))
    }
})

export default router
