'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Contato extends Model {
  contatos () {
    return this.belongsTo('App/models/Cliente')
  }
}

module.exports = Contato
