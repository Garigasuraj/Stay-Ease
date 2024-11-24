const { imageListClasses } = require('@mui/material')
const joiValidation = require('joi')

module.exports = joiValidation.object({
    title: joiValidation.string().min(1).max(30),
    description: joiValidation.string(),
    price: joiValidation.number().min(1).required(),
    location: joiValidation.string().strict().pattern(/^[a-zA-Z\s,]+$/),
    country: joiValidation.string().strict().pattern(/^[a-zA-Z\s,]+$/),
    image: joiValidation.optional()
}).required()