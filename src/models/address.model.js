const { DataTypes } = require("sequelize");

const ClientModel = require("../models/client.model");
const db = require("../config/db.config");

const Address = db.define("address", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  street: {
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
  number: {
    type: DataTypes.INTEGER,
  },
  complement: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "The field cannot be empty!",
      },
      len: {
        args: [1, 20],
        msg: "This field must be between 1 and 20 characters!",
      },
    },
  },
  zipCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "The field cannot be empty!",
      },
      len: {
        args: [1, 20],
        msg: "This field must be between 1 and 20 characters!",
      },
    },
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "The field cannot be empty!",
      },
      len: {
        args: [1, 20],
        msg: "This field must be between 1 and 20 characters!",
      },
    },
  },
});

Address.belongsTo(ClientModel);
ClientModel.hasOne(Address);

Address.sync(); // This creates the table if it doesn't exist (and does nothing if it already exists)

module.exports = Address;
