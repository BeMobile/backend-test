const { DataTypes, STRING } = require("sequelize");

const db = require("../config/db.config");
const UserModel = require("../models/user.model");
const Product = db.define(
  "product",
  {
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
        notEmpty: {
          msg: "The field cannot be empty!",
        },
        len: {
          args: [4, 20],
          msg: "This field must be between 4 and 20 characters!",
        },
      },
    },
    price: {
      type: DataTypes.DECIMAL,
    },
    description: DataTypes.STRING,
    author: DataTypes.STRING,
  },
  {
    paranoid: true,
    deleteAt: "softDelete",
  }
);

// 1:1
Product.belongsTo(UserModel, {
  constraint: true,
  foreignKey: "idUserOwner",
});

// 1:M
UserModel.hasMany(Product, {
  foreignKey: "idUserOwner",
});

Product.sync(); // This creates the table if it doesn't exist (and does nothing if it already exists)

module.exports = Product;
