import { validationResult } from "express-validator"
import { Response } from "../responses.js"

export function fieldValidator(validations) {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req)
            if (result.errors.length) break
        }

        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }

        res.json(Response(400, 'Invalid fields', errors))
    }
}
