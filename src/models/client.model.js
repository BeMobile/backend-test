const { DataTypes } = require("sequelize");

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
      notEmpty: {
        msg: "The field cannot be empty!",
      },
      len: {
        args: [2, 20],
        msg: "This field must be between 4 and 20 characters!",
      },
    },
  },
  cpf: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      notEmpty: {
        msg: "The field cannot be empty!",
      },
      len: {
        args: [14, 14],
        msg: "This field must be 11 characters! ex: 000.000.000-00",
      },
    },
  },
  birthday: {
    type: DataTypes.DATEONLY,
  },
});

Client.sync(); // This creates the table if it doesn't exist (and does nothing if it already exists)

module.exports = Client;
