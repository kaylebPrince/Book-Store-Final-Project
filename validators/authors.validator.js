const Joi = require("joi");

const AuthorAddSchema = Joi.object({
    firstName: Joi.string()
            .max(255)
            .required(),
    lastName: Joi.string()
            .max(255)
            .trim(),
    DOB: Joi.date()
            .greater('1-1-1900')
            .less('12-31-2022')
            .required(),
    country: Joi.string()
            .optional(),
    books: Joi.array()
            .items(Joi.string())
            .optional(),
    createAt: Joi.date()
            .default(Date.now),
    updateAt: Joi.date()
            .default(Date.now)
})

const AuthorUpdateSchema = Joi.object({
    firstName: Joi.string()
            .max(255),
    lastName: Joi.string()
            .max(255)
            .trim(),
    DOB: Joi.date()
            .greater('1-1-1900')
            .less('12-31-2022'),
    country: Joi.string(),
    books: Joi.array()
            .items(Joi.string())
})


async function addAuthorValidationMW(req,res,next){
    const authorPayload = req.body

    try {
        await AuthorAddSchema.validateAsync(authorPayload)
        next()
    } catch (error) {
        next({
                message: error.details[0].message,
                status: 400
        })
    }
}


async function UpdateAuthorValidationMW(req,res,next){
        const authorPayload = req.body
    
        try {
            await AuthorUpdateSchema.validateAsync(authorPayload)
            next()
        } catch (error) {
            next({
                    message: error.details[0].message,
                    status: 400
            })
        }
    }

module.exports = {
        addAuthorValidationMW,
        UpdateAuthorValidationMW
}