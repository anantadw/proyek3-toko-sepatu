const { body } = require('express-validator')

const validateProduct = [
    body('name')
        .trim().escape()
        .exists().withMessage('Name doesn\'t exist').bail()
        .notEmpty().withMessage('Name is required').bail()
        .isLength({min: 5}).withMessage('Name must be at least 5 characters').bail()
        .isAlphanumeric(undefined, {ignore: '\s'}).withMessage('Name must contain only letter, number, and space'),
    body('price')
        .trim().escape()
        .exists().withMessage('Price doesn\'t exist').bail()
        .notEmpty().withMessage('Price is required').bail()
        .isNumeric().withMessage('Price must contain only number').bail()
        .isFloat({min: 0}).withMessage('Price minimum value is 0'),
    body('stock')
        .trim().escape()
        .exists().withMessage('Stock doesn\'t exist').bail()
        .notEmpty().withMessage('Stock is required').bail()
        .isNumeric().withMessage('Stock must contain only number').bail()
        .isInt({min: 0, max: 999}).withMessage('Stock minimum value is 0 and maximum is 999'),
    body('detail')
        .if(body('detail').exists())
            .trim().escape()
]

module.exports = validateProduct