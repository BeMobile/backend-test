const Sequelize = require('sequelize');
require('dotenv').config()

let sequelize;

const config = process.env
const doGetConnection = () =>
{
	// Inicia a conexao caso ainda exista uma conexao
	if (!sequelize)
	{
		sequelize = new Sequelize(config.DB_DATABASE, config.DB_USERNAME, config.DB_PASSWORD, {
			host: config.DB_HOST,
			dialect: config.DB_CONNECTION
		})
	}

	return sequelize
}

module.exports =
{
	name: 'database',
	description: 'Classe responsavel por gerenciar a database.',

	getConnection()
	{
		return doGetConnection()
	}
}
