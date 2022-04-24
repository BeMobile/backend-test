const { DataTypes } = require('sequelize');

const sequelize = require('../db/sequelize');

const Sell = sequelize.define('tbl_sell', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },

  quantity: { type: DataTypes.INTEGER, allowNull: false, unique: false },

  unit_price:  { type: DataTypes.FLOAT, allowNull: false, unique: false },
  total_price: { type: DataTypes.FLOAT, allowNull: false, unique: false },

  bought_at: { type: DataTypes.DATE, allowNull: false, unique: false, defaultValue: new Date() },

  fk_user: {
    type:       DataTypes.INTEGER, 
    allowNull:  false,
    references: {
      model: 'tbl_users', 
      key:   'id' 
    }
  },

  fk_book: {
    type:       DataTypes.INTEGER, 
    allowNull:  false,
    references: {
      model: 'tbl_books', 
      key:   'id'
    }
  }
}, {
  tableName:       'tbl_sell',
  freezeTableName: false,
  timestamps:      true,
  hooks: {}
});

Sell.sync();

module.exports = { Sell };
