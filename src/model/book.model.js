const { DataTypes } = require('sequelize');

const sequelize = require('../db/sequelize');

const ReleaseDate = sequelize.define('tbl_release_dates', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },

  day:   { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 31,   isDecimal: true }},
  month: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 12,   isDecimal: true }},
  year:  { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 3000, isDecimal: true }}
}, {
  tableName:       'tbl_release_dates',
  freezeTableName: false,
  timestamps:      false,
  hooks: {}
});

const Book = sequelize.define('tbl_books', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },

  title:  { type: DataTypes.STRING, allowNull: false, unique: false },
  format: { type: DataTypes.ENUM(
      'paperback', 'ebook'
    ), allowNull: false, unique: false },

  price:        { type: DataTypes.FLOAT,   allowNull: false, unique: false },
  number_pages: { type: DataTypes.INTEGER, allowNull: false, unique: false },

  fk_publisher: {
    type:       DataTypes.INTEGER, 
    allowNull:  false,
    references: {
      model: 'tbl_publishers', 
      key:   'id' 
    }
  },

  fk_release_date: {
    type:       DataTypes.INTEGER, 
    allowNull:  false,
    references: {
      model: 'tbl_release_dates', 
      key:   'id' 
    }
  },

  fk_author: {
    type:       DataTypes.INTEGER, 
    allowNull:  false,
    references: {
      model: 'tbl_authors', 
      key:   'id' 
    }
  }
}, {
  tableName:       'tbl_books',
  freezeTableName: false,
  timestamps:      true,
  hooks: {}
});

ReleaseDate.sync();
Book.sync();

module.exports = { Book, ReleaseDate };
