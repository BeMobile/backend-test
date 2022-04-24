const jwt = require('jsonwebtoken');

const UserService = require('../service/user.service');
const log         = require('../logger/index');
const redis       = require('../db/redis');

class SessionController{
  async auth(req, res){
    let { login, password } = req.body;

    try{
      const result = await UserService.verifyIfUserAlreadyExists(login, login);

      if(result){
        const passwordMatch = await UserService.decryptPassword(password, result.password);

        if(passwordMatch) {
          const token = jwt.sign({
            id:       result.id,
            username: result.username,
            email:    result.email
          }, process.env.ENV_JWT_SECRET);

          await Promise.resolve(redis.set(`login:user:${result.id}`, token));

          log.info(`Route: Login ID: ${ result.id } Login: ${ login }`);

          return res.status(200).json({ status: true, token: token }); 
        } else {
          throw new Error ('Login/Password don\'t match')
        }
      }

      throw new Error('User not found or doesn\'t exists');
    }catch(err){
      log.info(`Failed to login`);
      console.log({err})

      return res.status(500).json({ status: false, message: err.message });
    }
  }
}

module.exports = new SessionController;
