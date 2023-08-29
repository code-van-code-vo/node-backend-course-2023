import express from 'express'
import { Op } from 'sequelize'
import { MessageResponse, DataResponse, Response, InternalErrorResponse, NotFoundResponse, InvalidTypeResponse } from '../common/reponses.js'
import { requireRole } from '../middlewares/auth.js'

import Book from '../models/Book.js'
import fileUpload from 'express-fileupload'

const router = express.Router()

router.get('/', async (req, res) => {
    const pageNo = parseInt(req.query.page_no) || 1
    const limit = parseInt(req.query.limit) || 10
    const title = req.query.title
    console.log(pageNo, limit)

    const books = await Book.findAll({
        limit: limit,
        offset: (pageNo-1)*limit,
        where: {
            title: {
                [Op.like]: '%' + title
            }
        },
    })
    
    res.json(DataResponse(books))
})

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)

    const book = await Book.findOne({
        where: {
            id: id,
        }
    })

    if (book == null) {
        res.json(NotFoundResponse())
    } else {
        res.json(DataResponse(book))
    }
})

router.post('/', requireRole('user'), fileUpload(), async (req, res) => {
    const { title, author, summary } = req.body
    const thumbnailImage = req.files.thumbnail_image
    const userId = res.locals.userData.id

    const [fileType, fileExt] = thumbnailImage.mimetype.split('/')

    const savePath = `./public/images/${Date.now()}_${title.replace(' ', '-')}.${fileExt}`
    const allowExtensions = ['png', 'jpg', 'jpeg']
    if (fileType !== 'image' || !allowExtensions.includes(fileExt)) {
        res.json(InvalidTypeResponse())
        return;
    }

    thumbnailImage.mv(savePath)
    try {
        let book = await Book.create({
            title,
            author,
            summary,
            thumbnailImage: savePath,
            creatorId: userId,
        })
        res.json(DataResponse({
            id: book.id,
            thumbnailImage: savePath,
        }))
    } catch(err) {
        console.log(err)
        res.json(InternalErrorResponse())
    }
})

router.delete('/:id', requireRole('admin'), async (req, res, next) => {
    const id = parseInt(req.params.id)

    try {
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
    } catch(err) {
        console.log(err)
        res.json(InternalErrorResponse())
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
