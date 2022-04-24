const Redis = require('redis');

const { promisify } = require('util');

const host = process.env.ENV_REDIS_HOST;
const port = process.env.ENV_REDIS_PORT;

const redisClient = Redis.createClient({ host, port });

redisClient.connect();

redisClient.on('error', (err) => {
  console.error('Failed on connect to redis', err);
});

module.exports = redisClient;