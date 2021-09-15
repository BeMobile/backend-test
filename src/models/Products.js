import Sequelize, { Model } from 'sequelize';

export default class Products extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Name cant be empty',
          },
        },
      },
      price: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Price cant be empty',
          },
        },
      },
      description: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Description cant be empty',
          },
        },
      },
    }, {
      sequelize,
      tableName: 'products',
    });
    return this;
  }
}
