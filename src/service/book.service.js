const Joi = require('joi');

const { Book } = require('../model/book.model');

class BookService{
  async bookRegisterValidation(...args){
    const registerValidate = Joi.object({
      authorID: Joi.number().required(),
    
      day:   Joi.number().required(),
      month: Joi.number().required(),
      year:  Joi.number().required(),
    
      publisherID: Joi.number().required(),
    
      title:  Joi.string().required(),
      format: Joi.string().valid(
        'paperback', 'ebook'
      ),
      price:        Joi.number().required(),
      number_pages: Joi.number().required()
    });

    return await registerValidate.validateAsync(...args);
  }

  async bookUpdateValidation(...args){
    const updateValidate = Joi.object({
      authorID: Joi.number(),
    
      day:   Joi.number(),
      month: Joi.number(),
      year:  Joi.number(),
    
      publisherID: Joi.number(),
    
      title:  Joi.string(),
      format: Joi.string().valid(
        'paperback', 'ebook'
      ),
      price:        Joi.number(),
      number_pages: Joi.number()
    });

    return await updateValidate.validateAsync(...args);
  }

  async verifyIfBookAlreadyExistsByID(id){
    const bookFound = await Book.findByPk(id);

    return bookFound;
  }
}

module.exports = new BookService;
