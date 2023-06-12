const Joi = require("joi")


const validateUserDetails = (data)=> {
    const userSchema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        phone: Joi.string().required()
        
    })
        return userSchema.validate(data)
}


module.exports = validateUserDetails