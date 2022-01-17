const { DataTypes, TimeoutError } = require("sequelize");

const db = require("../config/db.config");

const User = db.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    isEmail: true,
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.sync(); // This creates the table if it doesn't exist (and does nothing if it already exists)

module.exports = User;
