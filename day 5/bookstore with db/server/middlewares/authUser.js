import jwt from 'jsonwebtoken'
import { UnauthorizedResponse } from '../common/reponses.js'

function authUser(req, res, next) {
    const token = req.headers['authorization']
    try {
        const data = jwt.verify(token, process.env.SECRET)
        next()
    } catch(err) {
        res.json(UnauthorizedResponse())
    }
}

export default authUser
