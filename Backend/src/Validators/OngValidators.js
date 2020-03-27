const {celebrate, Segments, Joi} = require('celebrate')


module.exports={
  create : celebrate({
    [Segments.BODY]: Joi.object().keys({
      name:Joi.string().required(),
      email: Joi.string().email().required(),
      whatsapp: Joi.string().required().min(10).max(15),
      city: Joi.string().required(),
      uf: Joi.string().length(2).required()
    })
  }),
  
  delete : celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required()
    })
  }),
  

  headerValidator :celebrate({
    [Segments.HEADERS]:Joi.object({
      authorization:Joi.string().required()}).unknown()
  })
  
 
   
  
}