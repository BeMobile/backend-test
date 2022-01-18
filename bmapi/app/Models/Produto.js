'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Produto extends Model {
  sales () {
    return this.belongsToMany('App/Models/Venda')
  }


}

module.exports = Produto
