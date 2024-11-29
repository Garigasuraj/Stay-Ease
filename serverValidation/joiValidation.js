const { imageListClasses } = require('@mui/material')
const joiValidation = require('joi')

const createPostValidation = joiValidation.object({
    title: joiValidation.string().min(1).max(30),
    description: joiValidation.string(),
    price: joiValidation.number().min(1).required(),
    location: joiValidation.string().strict().pattern(/^[a-zA-Z\s,]+$/),
    country: joiValidation.string().strict().pattern(/^[a-zA-Z\s,]+$/),
    image: joiValidation.optional()
}).required()

const userLoginValidation = joiValidation.object({
    username: joiValidation.string().min(3).max(30).email().empty(),
    password: joiValidation.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=\\S+$).{8,30}$')).empty()
}).required()

module.exports = {createPostValidation,userLoginValidation}