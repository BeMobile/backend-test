const { DataTypes } = require("sequelize");

const ClientModel = require("../models/client.model");
const db = require("../config/db.config");

const Phone = db.define("phone", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  phone: {
    type: DataTypes.STRING,
  },
});

Phone.belongsTo(ClientModel);
ClientModel.hasMany(Phone);

Phone.sync(); // This creates the table if it doesn't exist (and does nothing if it already exists)

module.exports = Phone;
