const Joi = require('joi');

const { Author } = require('../model/author.model');

class AuthorService{
  async authorRegisterValidation(...args){
    const registerValidate = Joi.object({
      first_name: Joi.string().required(),
      last_name:  Joi.string()
    });

    return await registerValidate.validateAsync(...args);
  }

  async authorUpdateValidation(...args){
    const updateValidate = Joi.object({
      first_name: Joi.string(),
      last_name:  Joi.string()
    });

    return await updateValidate.validateAsync(...args);
  }

  async verifyIfAuthorAlreadyExistsByID(id){
    const authorFound = await Author.findByPk(id);

    return authorFound;
  }
}

module.exports = new AuthorService;
