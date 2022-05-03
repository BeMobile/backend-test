const { Sequelize } = require('sequelize');
                      require('dotenv').config();

const port     = process.env.ENV_DATABASE_PORT;
const password = process.env.ENV_DATABASE_PASSWORD;
const username = process.env.ENV_DATABASE_USERNAME;
const host     = process.env.ENV_DATABASE_HOST;
const database = process.env.ENV_DATABASE_NAME;
// const dialect  = 'postgres';
const dialect  = 'mysql';

const sequelize = new Sequelize({
  port,
  password,
  username,
  host,
  database,
  dialect,
  logging: false
});

module.exports = sequelize;
