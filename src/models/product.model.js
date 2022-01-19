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
          args: [2, 20],
          msg: "This field must be between 4 and 20 characters!",
        },
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "The field cannot be empty!",
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "The field cannot be empty!",
        },
        len: {
          args: [2, 200],
          msg: "This field must be between 4 and 200 characters!",
        },
      },
    },
    author: {
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
  },
  {
    paranoid: true,
    deleteAt: "softDelete",
  }
);

Product.sync(); // This creates the table if it doesn't exist (and does nothing if it already exists)

module.exports = Product;
