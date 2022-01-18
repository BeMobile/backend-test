const Sequelize = require('sequelize');
const db = require('./db');

const Cliente = db.define('Clientes', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: true,
    }

});

//Cliente.sync();

module.exports = Cliente;