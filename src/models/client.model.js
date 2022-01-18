const { DataTypes } = require("sequelize");

const UserModel = require("../models/user.model");
const db = require("../config/db.config");

const Client = db.define("client", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  cpf: {
    type: DataTypes.STRING,
    unique: true,
  },
  birthday: {
    type: DataTypes.DATEONLY,
  },
});

Client.sync(); // This creates the table if it doesn't exist (and does nothing if it already exists)

module.exports = Client;
