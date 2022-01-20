const { INTEGER, Sequelize } = require("sequelize");
const { DataTypes, TimeoutError } = require("sequelize");

const ClientModel = require("../models/client.model");
const ProductModel = require("../models/product.model");

const db = require("../config/db.config");

const Sale = db.define("sale", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productName: {
    type: DataTypes.STRING,
  },
  unitPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "The field cannot be empty!",
      },
    },
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "The field cannot be empty!",
      },
    },
  },
  dateOfSale: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
});

Sale.belongsTo(ClientModel);
ClientModel.hasMany(Sale);

Sale.sync(); // This creates the table if it doesn't exist (and does nothing if it already exists)

module.exports = Sale;
