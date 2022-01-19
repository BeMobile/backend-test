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
  qtt: {
    type: DataTypes.INTEGER,
    allowNull: false,
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

// client
// 1:1
Sale.belongsTo(ClientModel);

// 1:M
ClientModel.hasMany(Sale);

// product
// 1:1
Sale.belongsTo(ProductModel);

// 1:M
ProductModel.hasMany(Sale);

Sale.sync(); // This creates the table if it doesn't exist (and does nothing if it already exists)

module.exports = Sale;
