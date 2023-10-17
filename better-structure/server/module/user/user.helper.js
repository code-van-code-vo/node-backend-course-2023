import jwt from 'jsonwebtoken'

export function setUserJWT(res, user) {
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
    }
    const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: '3h'
    })
    res.cookie('token', token)
    return token
}
