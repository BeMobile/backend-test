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
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: "Duplicate entry for key email",
    },
    isEmail: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.sync(); // This creates the table if it doesn't exist (and does nothing if it already exists)

module.exports = User;
