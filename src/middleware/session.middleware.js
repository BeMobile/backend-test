const jwt = require('jsonwebtoken');

const redis = require('../db/redis');
const log   = require('../logger/index');

module.exports = async (req, res, next) => {
  try{
    const authToken = req.headers['authorization'];
  
    if(authToken){
      const [ _, token ] = authToken.split(' ');

      const decoded = jwt.verify(token, process.env.ENV_JWT_SECRET);

      if(decoded.id){
        const redisCacheResult = await Promise.resolve(redis.get(`login:user:${decoded.id}`));

        if(redisCacheResult === token){
          req.id       = decoded.id,
          req.username = decoded.username,
          req.email    = decoded.email

          log.info(`Auth Middleware ID: ${ decoded.id } Username: ${ decoded.username }`);
          return next();
        }
      }

      throw new Error('Token expired');
    }
    throw new Error('Authentication token is necessary');
  }catch(err){
    log.info('Failed on authenticate user');
      return res.status(500).json({ status: false, error: { msg: 'Failed on authentication', error: err.message }});
  }
}
