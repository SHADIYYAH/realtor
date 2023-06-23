const Joi = require('joi')
const validatelistingsDetails = (data) =>{
   const listingsSchema = Joi.object({
    type: Joi.string().required(),
    location : Joi.string().required(),
    purpose: Joi.string(),
    age_of_property: Joi.number().required(),
    asking_price: Joi.number().required(),
   })
   return listingsSchema.validate(data)
}
module.exports = validatelistingsDetails;
