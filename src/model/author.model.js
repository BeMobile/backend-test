const { DataTypes } = require('sequelize');

const sequelize = require('../db/sequelize');

const Author = sequelize.define('tbl_authors', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },

  first_name: { type: DataTypes.STRING, allowNull: false, unique: false },
  last_name:  { type: DataTypes.STRING, allowNull: true,  unique: false }
}, {
  tableName:       'tbl_authors',
  freezeTableName: false,
  timestamps:      true,
  hooks: {}
});

Author.sync();

module.exports = { Author };
