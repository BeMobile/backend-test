const { DataTypes } = require('sequelize');

const sequelize = require('../db/sequelize');

const Publisher = sequelize.define('tbl_publishers', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },

  publisher: { type: DataTypes.STRING, allowNull: false, unique: true }
}, {
  tableName:       'tbl_publishers',
  freezeTableName: false,
  timestamps:      true,
  hooks: {}
});

Publisher.sync();

module.exports = { Publisher };
