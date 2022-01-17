const { INTEGER } = require("sequelize");
const { DataTypes, TimeoutError } = require("sequelize");

const db = require("../config/db.config");

// - vendas: cliente, produto, quantidade, preço unitário, preço total, data e hora.
const Sale = db.define("sale", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  clientId: {
    type: DataTypes.INTEGER,
  },
  productId: {
    type: DataTypes.INTEGER,
  },
  qtt: {
    type: DataTypes.INTEGER,
  },
  unitPrice: {
    type: DataTypes.DECIMAL,
  },
  totalPrice: {
    type: DataTypes.DECIMAL,
  },
  dateOfSale: {
    type: DataTypes.DATE,
  },
});

Sale.sync(); // This creates the table if it doesn't exist (and does nothing if it already exists)

module.exports = Sale;
