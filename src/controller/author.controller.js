const { Author }    = require('../model/author.model');
const AuthorService = require('../service/author.service');
const log           = require('../logger/index');
const sequelize     = require('../db/sequelize');

class PublisherController{
  async index(_, res){
    const authorResult = await Author.findAll({
      order: [[ 'first_name', 'ASC' ]],
      raw: true
    });

    return res.status(200).json({
      status: true,
      total:  authorResult.length,
      result: authorResult
    });
  }

  async getById(req, res){
    const id = req.params.id;
    
    const authorExists = await AuthorService.verifyIfAuthorAlreadyExistsByID(id);
    if(!authorExists) return res.status(404).json({ status: false, message: 'Author doesn\t exists' });
    
    const authorResult = await Author.findByPk(id);

    return res.status(200).json({ 
      status: true,
      result: authorResult
    });
  }

  async create (req, res){
    let { first_name, last_name } = req.body;

    let transaction = await sequelize.transaction();

    try{
      await AuthorService.authorRegisterValidation({ first_name, last_name });

      let authorCreateResult = await Author.create({ first_name, last_name }, { transaction });

      await transaction.commit();

      log.info(`Author creation, ID: ${ authorCreateResult.id }, Name: ${ first_name }`);

      return res.status(201).json({ status: true, result: authorCreateResult });
    }catch(err){
      await transaction.rollback();

      log.error(`Author creation failed, Name: ${ first_name }`);

      return res.status(500).json({ status: false, message: err.message });
    }
  }

  async update(req, res){
    let { id } = req.params;
    let { first_name, last_name } = req.body;

    let transaction = await sequelize.transaction();

    try{
      const authorExists = await AuthorService.verifyIfAuthorAlreadyExistsByID(id);
      if(!authorExists) return res.status(404).json({ status: false, message: 'Author doesn\t exists' });

      await AuthorService.authorUpdateValidation({ first_name, last_name });

      await Author.update({ first_name, last_name }, { where: { id }}, { transaction });

      await transaction.commit();

      log.info(`Author update, ID: ${ id }`);

      return res.status(201).json({ status: true });
    }catch(err){
      await transaction.rollback();

      log.error(`Author update failed`);

      return res.status(500).json({ status: false, message: err.message });
    }
  }

  async remove(req, res){
    let { id } = req.params;

    let transaction = await sequelize.transaction();
    
    try{
      const authorExists = await AuthorService.verifyIfAuthorAlreadyExistsByID(id);
      if(!authorExists) return res.status(404).json({ status: false, message: 'Author doesn\t exists' });
      
      await Author.destroy({ where: { id }}, { transaction });

      await transaction.commit();

      log.info(`Author remove, ID: ${ id }`);

      return res.status(201).json({ status: true });
    }catch(err){
      await transaction.rollback();

      log.error(`Author remove failed, ID: ${ id }`);

      return res.status(500).json({ status: false, message: err.message });
    }
  }
}

module.exports = new PublisherController;
