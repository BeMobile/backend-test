const { DataTypes, STRING } = require("sequelize");

const db = require("../config/db.config");
const UserModel = require("../models/user.model");
const Product = db.define("product", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: DataTypes.DECIMAL,
  },
  description: DataTypes.STRING,
  author: DataTypes.STRING,
});

// 1:1
Product.belongsTo(UserModel, {
  constraint: true,
  foreignKey: "idUserOwner",
});

// 1:N
UserModel.hasMany(Product, {
  foreignKey: "idUserOwner",
});

Product.sync(); // This creates the table if it doesn't exist (and does nothing if it already exists)

module.exports = Product;
