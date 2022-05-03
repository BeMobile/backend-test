const { Publisher }    = require('../model/publisher.model');
const PublisherService = require('../service/publisher.service');
const log              = require('../logger/index');
const sequelize        = require('../db/sequelize');

class PublisherController{
  async index(_, res){
    const publisherResult = await Publisher.findAll({
      order: [[ 'publisher', 'ASC' ]],
      raw: true
    });

    return res.status(200).json({
      status: true,
      total:  publisherResult.length,
      result: publisherResult
    });
  }

  async getById(req, res){
    const id = req.params.id;
    
    const publisherExists = await PublisherService.verifyIfPublisherAlreadyExistsByID(id);
    if(!publisherExists) return res.status(404).json({ status: false, message: 'Publisher doesn\t exists' });
    
    const publisherResult = await Publisher.findByPk(id);

    return res.status(200).json({ 
      status: true,
      result: publisherResult
    });
  }

  async create (req, res){
    let {
      publisher
     } = req.body;

    let transaction = await sequelize.transaction();
    
    try{
      await PublisherService.publisherValidation({ publisher });

      let publisherCreateResult = await Publisher.create({ publisher }, { transaction });

      await transaction.commit();

      log.info(`Publisher creation, ID: ${ publisherCreateResult.id }, Publisher: ${ publisher }`);

      return res.status(201).json({ status: true, result: publisherCreateResult });
    }catch(err){
      await transaction.rollback();

      log.error(`Publisher creation failed, Publisher: ${ publisher }`);

      return res.status(500).json({ status: false, message: err.message });
    }
  }

  async update(req, res){
    let { id }        = req.params;
    let { publisher } = req.body;

    let transaction = await sequelize.transaction();
    
    try{
      const publisherExists = await PublisherService.verifyIfPublisherAlreadyExistsByID(id);
      if(!publisherExists) return res.status(404).json({ status: false, message: 'Publisher doesn\t exists' });

      await PublisherService.publisherValidation({ publisher });

      let publisherUpdateResult = await Publisher.update({ publisher }, { where: { id }}, { transaction });

      await transaction.commit();

      log.info(`Publisher update, ID: ${ publisherUpdateResult.id }, Publisher: ${ publisher }`);

      return res.status(201).json({ status: true });
    }catch(err){
      await transaction.rollback();

      log.error(`Publisher update failed, Publisher: ${ publisher }`);

      return res.status(500).json({ status: false, message: err.message });
    }
  }

  async remove(req, res){
    let { id } = req.params;

    let transaction = await sequelize.transaction();
    
    try{
      const publisherExists = await PublisherService.verifyIfPublisherAlreadyExistsByID(id);
      if(!publisherExists) return res.status(404).json({ status: false, message: 'Publisher doesn\t exists' });
      
      await Publisher.destroy({ where: { id }}, { transaction });

      await transaction.commit();

      log.info(`Publisher remove, ID: ${ id }`);

      return res.status(201).json({ status: true });
    }catch(err){
      await transaction.rollback();

      log.error(`Publisher remove failed, ID: ${ id }`);

      return res.status(500).json({ status: false, message: err.message });
    }
  }
}

module.exports = new PublisherController;
