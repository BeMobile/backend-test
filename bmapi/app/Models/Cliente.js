'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Cliente extends Model {
  vendas () {
    return this.hasOne('App/Models/Venda')
  }

  contatos () {
    return this.hasOne('App/Models/Contato')
  }

  enderecos () {
    return this.hasOne('App/Models/Endereco')
  }


}

module.exports = Cliente
