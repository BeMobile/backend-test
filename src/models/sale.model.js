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
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  dateOfSale: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
});

//client
// 1:1
Sale.belongsTo(ClientModel, {
  constraint: true,
  foreignKey: "idClient",
});

// 1:M
ClientModel.hasMany(Sale, {
  foreignKey: "idClient",
});

//product
// 1:1
Sale.belongsTo(ProductModel, {
  constraint: true,
  foreignKey: "idProduct",
});

// 1:M
ProductModel.hasMany(Sale, {
  foreignKey: "idProduct",
});

Sale.sync(); // This creates the table if it doesn't exist (and does nothing if it already exists)

module.exports = Sale;
