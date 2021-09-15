import Sequelize, { Model } from 'sequelize';

export default class Sales extends Model {
  static init(sequelize) {
    super.init({
      product: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Product cant be empty',
          },
        },
      },
      amount: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Amount cant be empty',
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
      day: {
        type: Sequelize.DATE,
        defaultValue: new Date(),

      },
    }, {
      sequelize,
      tableName: 'sales',
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Clients, { foreignKey: 'client_id' });
  }
}
