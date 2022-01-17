const { DataTypes } = require("sequelize");

const db = require("../config/db.config");

const Client = db.define("client", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cpf: {
    type: Sequelize.STRING,
  },
  description: Sequelize.STRING,
});

User.sync(); // This creates the table if it doesn't exist (and does nothing if it already exists)

module.exports = Client;
