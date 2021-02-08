const Joi = require('@hapi/joi');

//Register Validation
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        confirmpassword: Joi.ref('password'),
        address: Joi.string().min(5).required(),
        state: Joi.string().required(),
        country: Joi.string().required(),
        phone: Joi.number().required(),
        admin: Joi.required()
    })
    return schema.validate(data);
}

//Category Validation
const categoryValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required()
    })
    return schema.validate(data);
}

//Product Validation
const productValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        specs: Joi.array(),
        category: Joi.string().required(),
        stock: Joi.number().required()
    })
    return schema.validate(data);
}

//Comment validation
const commentValidation = (data) => {
    const schema = Joi.object({
        comment: Joi.string().required()
    })
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.categoryValidation = categoryValidation;
module.exports.productValidation = productValidation;
module.exports.commentValidation = commentValidation;