import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Clients from '../models/Clients';
import Sales from '../models/Sales';
import User from '../models/User';
import Products from '../models/Products';

const models = [Clients, Sales, User, Products];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
