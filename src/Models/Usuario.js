const Sequelize = require('sequelize')
const Database = require('./Database').getConnection()

const Usuario = Database.define(
'usuario',
    {
        id:
        {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },

        email:
        {
            type: Sequelize.STRING
        },

        cpf:
        {
            type: Sequelize.STRING
        }
    }
)

module.exports = Usuario
