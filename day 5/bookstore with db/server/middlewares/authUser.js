import jwt from 'jsonwebtoken'

function authUser(req, res, next) {
    const token = req.headers['authorization']
    const data = jwt.verify(token, process.env.SECRET)
    console.log(data)
    next()
}

export default authUser
