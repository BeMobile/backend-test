const Joi    = require('joi');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

const { User } = require('../model/user.model');
const log      = require('../logger/index');

class UserService{
  async userRegisterValidation(...args){
    const registerValidate = Joi.object({
      username:   Joi.string().required(),
      email:      Joi.string().required(),
      password:   Joi.string().required(),
      first_name: Joi.string().required(),
      last_name:  Joi.string(),
      cpf_cnpj:   Joi.string().required(),
    
      ddd:         Joi.number().required(),
      phoneNumber: Joi.number().required(),
    
      street:        Joi.string().required(),
      addressNumber: Joi.number().required(),
      neighborhood:  Joi.string().required(),
      zipcode:       Joi.string().required(),
      state:         Joi.string().valid(
        'AC', 'AL', 'AP', 'AM', 'BA', 
        'CE', 'ES', 'GO', 'MA', 'MT', 
        'MS', 'MG', 'PA', 'PB', 'PR', 
        'PE', 'PI', 'RJ', 'RN', 'RS', 
        'RO', 'RR', 'SC', 'SP', 'SE', 
        'TO', 'DF'
      ),
    
      observation: Joi.string()
    });

    return await registerValidate.validateAsync(...args);
  }

  async userUpdateValidation(...args){
    const updateValidate = Joi.object({
      username:   Joi.string(),
      email:      Joi.string(),
      password:   Joi.string(),
      first_name: Joi.string(),
      last_name:  Joi.string(),
      cpf_cnpj:   Joi.string(),
    
      ddd:         Joi.number(),
      phoneNumber: Joi.number(),
    
      street:        Joi.string(),
      addressNumber: Joi.number(),
      neighborhood:  Joi.string(),
      zipcode:       Joi.string(),
      state:         Joi.string().valid(
        'AC', 'AL', 'AP', 'AM', 'BA', 
        'CE', 'ES', 'GO', 'MA', 'MT', 
        'MS', 'MG', 'PA', 'PB', 'PR', 
        'PE', 'PI', 'RJ', 'RN', 'RS', 
        'RO', 'RR', 'SC', 'SP', 'SE', 
        'TO', 'DF'
      ),
    
      observation: Joi.string()
    });

    return await updateValidate.validateAsync(...args);
  }

  async encryptPassword(password){
    try{
      const newPassword = await bcrypt.hash(password, parseInt(process.env.ENV_PASSWORD_ENCRYPT_SALTS));

      return newPassword;
    }catch(err){
      return log.error('Encrypt Password failed', err.message);
    }
  }

  async decryptPassword(originalPassword, hashPassword){
    try{
      const isOriginalPassword = await bcrypt.compare(originalPassword, hashPassword);
  
      return isOriginalPassword;
    }catch(err){
      return log.error('Decrypt Password failed', err.message);
    }
  }

  async verifyIfUserAlreadyExists(username, email){
    const userFound = await User.findOne({
      where: {
        [Op.or]: [
          { username },
          { email    }
        ]
      }
    });

    return userFound;
  }

  async verifyIfUserAlreadyExistsByID(id){
    const userFound = await User.findByPk(id);

    return userFound;
  }
}

module.exports = new UserService;
