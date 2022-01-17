const { DataTypes, STRING } = require("sequelize");

const db = require("../config/db.config");

const Product = db.define("product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  description: DataTypes.STRING,
  author: DataTypes.STRING,
});

User.sync(); // This creates the table if it doesn't exist (and does nothing if it already exists)

module.exports = Product;
