'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Venda extends Model {
  clientes () {
    return this.belongsToMany('App/Models/Cliente')
  }
  produtos () {
    return this.belongsToMany('App/Models/Produto')
  }
}

module.exports = Venda
