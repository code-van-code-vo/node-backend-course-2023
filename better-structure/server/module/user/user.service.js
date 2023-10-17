import { Op } from "sequelize"
import { encrypt } from "../../common/utils/crypto.helper.js"
import { sendEmail } from "../../common/utils/sendEmail.helper.js"
import { User } from "./user.model.js"

export async function getAllUsers() {
    const users = await User.findAll()
    return users
}

export async function findUser(fields) {
    try {
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { id: fields.id || 0 },
                    { username: fields.username || '' },
                    { email: fields.email || 'empty' },
                ]
            }
        })
        return user
    } catch(err) {
        return null
    }
}

export async function sendRegisterEmail(username, email, password) {
    const hashPassword = await bcrypt.hash(password, 10)
    const data = {
        email,
        username,
        password: hashPassword,
        iat: Date.now(),
    }
    const encrypted = encrypt(data)

    const confirmLink = `${process.env.SERVER_URL}/users/confirm_register?code=${encrypted}`
    const emailHeader = 'Confirm register account at My Bookstore'
    const emailBody = `
        <h2>My Bookstore App</h2>
        <p>Click this link to register your account at My Bookstore:</p>
        <a href="${confirmLink}">${confirmLink}</a>
    `

    sendEmail(data.email, emailHeader, emailBody, () => {
        res.json(DataResponse('Check your email'))
    })
}

export async function register(data) {
    const fiveMin = 5*60*1000
    if (Date.now() - data.iat > fiveMin) {
        res.json(UnauthorizedResponse())
        return;
    }
    const user = await User.create({
        email: data.email,
        username: data.username,
        password: data.password,
    })
    return user
}
