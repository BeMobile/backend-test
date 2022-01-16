const Sequelize = require('sequelize')
const Database = require('./Database').getConnection()

const Cliente = Database.define(
'cliente',
	{
		id:
		{
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true
		},

		nome:
		{
			type: Sequelize.STRING
		},

		cpf:
		{
			type: Sequelize.STRING
		}
	}
)

module.exports = Cliente
