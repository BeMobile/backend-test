const Joi = require('joi');

const { Publisher } = require('../model/publisher.model');

class PublisherService{
  async sellValidation(...args){
    const registerValidate = Joi.object({
      userID:   Joi.number().required(),
      bookID:   Joi.number().required(),
    
      quantity:   Joi.number().required()
    });

    return await registerValidate.validateAsync(...args);
  }
}

module.exports = new PublisherService;
