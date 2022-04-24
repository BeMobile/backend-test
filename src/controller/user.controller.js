const moment = require('moment');

const { 
  Address, 
  Contact, 
  User 
} = require('../model/user.model');
const { Sell }    = require('../model/sell.model');
const UserService = require('../service/user.service');
const log         = require('../logger/index');
const sequelize   = require('../db/sequelize');
const redis       = require('../db/redis');

class UserController {
  async index(_, res){
    const usersResult = await User.findAll({
      order: [[ 'id', 'ASC' ]],
      attributes: { 
        exclude: 'password'
      }, raw: true
    });

    return res.status(200).json({ 
      status: true,
      total:  usersResult.length,
      result: usersResult
    });
  }

  async getById(req, res){
    const id = req.params.id;

    const userExists = await UserService.verifyIfUserAlreadyExistsByID(id);
    if(!userExists) return res.status(404).json({ status: false, message: 'User doesn\t exists' });

    const usersResult = await User.findOne({
      where:{ id },
      attributes: { 
        exclude: 'password'
      }, raw: true
    });
    const contactResult = await Contact.findAll({ where: { fk_user: id }});
    const addressResult = await Address.findAll({ where: { fk_user: id }});

    return res.status(200).json({ 
      status: true,
      result: {
        user:    usersResult,
        contact: contactResult,
        address: addressResult
      }
    });
  }

  async getUserPurchases(req, res){
    const id = req.params.id;
    
    const { month, year } = req.query;

    const userExists = await UserService.verifyIfUserAlreadyExistsByID(id);
    if(!userExists) return res.status(404).json({ status: false, message: 'User doesn\t exists' });
    
    const usersResult = await User.findOne({
      where:{ id },
      attributes: { 
        exclude: 'password'
      }, raw: true
    });

    let userPurchases = await Sell.findAll({
      order: [[ 'createdAt', 'DESC' ]],
      where: { fk_user: id },
      raw: true
    });
    
    if(month && year)
      userPurchases = userPurchases.filter(purchase => {
        const datePurchase   = moment(purchase.createdAt).format('MM-YYYY');
        const filterPurchase = `${month}-${year}`;

        if(datePurchase !== filterPurchase) return false;

        return true;
      });

    return res.status(200).json({ 
      status: true,
      total:  usersResult.length,
      result: {
        user:      usersResult,
        purchases: userPurchases
      }
    });
  }

  async create(req, res){
    let { 
      username, 
      email, 
      password, 
      first_name, 
      last_name, 
      cpf_cnpj,

      ddd,
      phoneNumber,

      street,
      addressNumber,
      neighborhood,
      zipcode,
      state,
      observation
     } = req.body;

    let transaction = await sequelize.transaction();
    
    try{
      await UserService.userRegisterValidation({
        username, email, password, first_name, last_name, cpf_cnpj,
        ddd, phoneNumber,
        street, addressNumber, neighborhood, zipcode, state, observation
      });

      username = username.toLowerCase();
      email    = email.toLowerCase();
      password = await UserService.encryptPassword(password);

      const userAlreadyExists = await UserService.verifyIfUserAlreadyExists(username, email);
      if(userAlreadyExists) throw new Error('Username/email already in use, try again');

      let userCreateResult = await User.create({
        username, email, 
        password, first_name, 
        last_name, cpf_cnpj
      }, { transaction });
      let addressCreateResult = await Address.create({ 
        street, number: addressNumber, 
        neighborhood, zipcode, 
        state, observation,
        fk_user: userCreateResult.id
      }, { transaction });
      let contactCreateResult = await Contact.create({
        ddd, number: phoneNumber,
        fk_user: userCreateResult.id
      }, { transaction });

      let userInformations = { 
        user:    userCreateResult, 
        address: addressCreateResult, 
        contact: contactCreateResult 
      };
      userInformations.user.password = undefined;

      userCreateResult    = undefined;
      addressCreateResult = undefined;
      contactCreateResult = undefined;

      await transaction.commit();

      log.info(`User creation, ID: ${ userInformations.id }, Username: ${ username }`);

      return res.status(201).json({ status: true, result: userInformations });
    }catch(err){
      await transaction.rollback();

      log.error(`User creation failed, Username: ${ username }`);

      return res.status(500).json({ status: false, message: err.message });
    }
  }

  async update(req, res){
    let { id } = req.params;
    let { 
      username, 
      email, 
      password, 
      first_name, 
      last_name, 
      cpf_cnpj,

      ddd,
      phoneNumber,

      street,
      addressNumber,
      neighborhood,
      zipcode,
      state,
      observation 
    } = req.body;

    let transaction = await sequelize.transaction();

    try{
      const userExists = await UserService.verifyIfUserAlreadyExistsByID(id);
      if(!userExists) return res.status(404).json({ status: false, message: 'User doesn\t exists' });

      await UserService.userUpdateValidation({ 
        username, email, password, first_name, last_name, cpf_cnpj,
        ddd, phoneNumber,
        street, addressNumber, neighborhood, zipcode, state, observation
      });

      if(password) password = await UserService.encryptPassword(password);

      await User.update({ 
        username, email, 
        password, first_name, 
        last_name, cpf_cnpj 
      }, { where: { id }}, { transaction });
      await Contact.update({ 
        ddd, phoneNumber 
      }, { where: { fk_user: userExists.id }}, { transaction });
      await Address.update({ 
        street, addressNumber, 
        neighborhood, zipcode, 
        state, observation 
      }, { where: { fk_user: userExists.id }}, { transaction });

      await transaction.commit();

      log.info(`User update, ID: ${ id }`);

      return res.status(201).json({ status: true });
    }catch(err){
      await transaction.rollback();

      log.error(`User update failed`);

      return res.status(500).json({ status: false, message: err.message });
    }
  }

  async remove(req, res){
    let { id } = req.params;

    let transaction = await sequelize.transaction();

    try{
      const userExists = await UserService.verifyIfUserAlreadyExistsByID(id);
      if(!userExists) return res.status(404).json({ status: false, message: 'User doesn\t exists' });

      await Contact.destroy({ where: { fk_user: userExists.id }});
      await Address.destroy({ where: { fk_user: userExists.id }});
      await User.destroy({ where: { id }}, { transaction });

      await Promise.resolve(redis.del(`login:user:${id}`));

      await transaction.commit();

      log.info(`User remove, ID: ${ id }`);

      return res.status(201).json({ status: true });
    }catch(err){
      await transaction.rollback();

      log.error(`User remove failed, ID: ${ id }`);

      return res.status(500).json({ status: false, message: err.message });
    }
  }
}

module.exports = new UserController;
