const Joi = require('joi');

const { Publisher } = require('../model/publisher.model');

class PublisherService{
  async publisherValidation(...args){
    const registerValidate = Joi.object({
      publisher: Joi.string().required()
    });

    return await registerValidate.validateAsync(...args);
  }

  async verifyIfPublisherAlreadyExistsByID(id){
    const publisherFound = await Publisher.findByPk(id);

    return publisherFound;
  }
}

module.exports = new PublisherService;
