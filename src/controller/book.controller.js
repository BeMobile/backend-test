const { Book, ReleaseDate } = require('../model/book.model');

const PublisherService = require('../service/publisher.service');
const AuthorService    = require('../service/author.service');
const BookService      = require('../service/book.service');

const log       = require('../logger/index');
const sequelize = require('../db/sequelize');

class ProductController {
  async index(_, res) {
    const productResult = await Book.findAll({
      order: [[ 'title', 'ASC' ]],
      raw: true
    });

    return res.status(200).json({
      status: true,
      total:  productResult.length,
      result: productResult
    });
  }

  async getById(req, res) {
    const id = req.params.id;

    const bookExists = await BookService.verifyIfBookAlreadyExistsByID(id);
    if(!bookExists) return res.status(404).json({ status: false, message: 'Book doesn\t exists' });
    
    const bookResult = await Book.findAll({
      where:{ id },
      raw: true
    });

    return res.status(200).json({ 
      status: true,
      result: bookResult
    });
  }

  async create (req, res) {
    let {
      authorID,

      day,
      month,
      year,

      publisherID,

      title,
      format,
      price,
      number_pages
     } = req.body;

    let transaction = await sequelize.transaction();

    try{
      const publisherResult = await PublisherService.verifyIfPublisherAlreadyExistsByID(publisherID);
      if(!publisherResult) return res.status(404).json({ status: false, message: 'Publisher doesn\'t exists' });
      
      const authorResult = await AuthorService.verifyIfAuthorAlreadyExistsByID(authorID);
      if(!authorResult) return res.status(404).json({ status: false, message: 'Author doesn\'t exists' });

      await BookService.bookRegisterValidation({
        authorID,
        day, month, year,
        publisherID,
        title, format, price, number_pages
      });

      let releaseDateCreateResult = await ReleaseDate.create({
        day, month, year
      }, { transaction });
      let bookCreateResult = await Book.create({
        title, format, price, number_pages,
        fk_publisher:    publisherID,
        fk_release_date: releaseDateCreateResult.id,
        fk_author:       authorID,
      }, { transaction });

      bookCreateResult.fk_publisher    = undefined;
      bookCreateResult.fk_release_date = undefined;
      bookCreateResult.fk_author       = undefined;

      let bookInformation = { 
        author:       authorResult,
        release_date: releaseDateCreateResult,
        publisher:    publisherResult,
        book:         bookCreateResult
      };

      await transaction.commit();

      log.info(`Book creation, ID: ${ bookInformation.book.id }, Title: ${ title }`);

      return res.status(201).json({ status: true, result: bookInformation });
    }catch(err){
      await transaction.rollback();

      log.error(`Book creation failed, Title: ${ title }`);

      return res.status(500).json({ status: false, message: err.message });
    }
  }

  async update (req, res) {
    let {
      authorID,

      day,
      month,
      year,

      publisherID,

      title,
      format,
      price,
      number_pages
     } = req.body;

     const { id } = req.params;

    let transaction = await sequelize.transaction();

    try{
      const publisherResult = await PublisherService.verifyIfPublisherAlreadyExistsByID(publisherID);
      if(!publisherResult) return res.status(404).json({ status: false, message: 'Publisher doesn\'t exists' });

      const authorResult = await AuthorService.verifyIfAuthorAlreadyExistsByID(authorID);
      if(!authorResult) return res.status(404).json({ status: false, message: 'Author doesn\'t exists' });

      const bookResult = await BookService.verifyIfBookAlreadyExistsByID(id);
      if(!bookResult) return res.status(404).json({ status: false, message: 'Book doesn\'t exists' });

      await BookService.bookUpdateValidation({
        authorID,
        day, month, year,
        publisherID,
        title, format, price, number_pages
      });

      console.log('aqui')

      await ReleaseDate.update({
        day, month, year
      }, { 
        where: { id: bookResult.fk_release_date 
      }}, { transaction });

      await Book.update({
        title, format, price, number_pages,
        fk_publisher:    publisherID,
        fk_author:       authorID,
      },{
        where: { id }
      }, { transaction });

      await transaction.commit();

      log.info(`Book update, ID: ${ id }`);

      return res.status(201).json({ status: true });
    }catch(err){
      await transaction.rollback();

      log.error(`Book update failed`);

      return res.status(500).json({ status: false, message: err.message });
    }
  }

  async delete (req, res) {
     const { id } = req.params;

    let transaction = await sequelize.transaction();

    try{
      const bookResult = await BookService.verifyIfBookAlreadyExistsByID(id);
      if(!bookResult) return res.status(404).json({ status: false, message: 'Book doesn\'t exists' });

      await Book.destroy({ where: { id }}, { transaction });

      await transaction.commit();

      log.info(`Book remove, ID: ${ id }`);

      return res.status(201).json({ status: true });
    }catch(err){
      await transaction.rollback();

      log.error(`Book remove failed`);

      return res.status(500).json({ status: false, message: err.message });
    }
  }
}

module.exports = new ProductController;
