import { body, param } from "express-validator"

export const loginValidation = [
    body('username')
        .isString()
        .trim(),

    body('password')
        .isString()
        .trim()
]

export const registerValidation = [
    body('username')
        .isString()
        .trim()
        .isLength({ min: 6, max: 30 }),

    body('email')
        .isString()
        .trim()
        .isEmail(),

    body('password')
        .isString()
        .trim()
        .isLength({ min: 8, max: 100 }),
]
