'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClienteEnderecoSchema extends Schema {
  up () {
    this.table('enderecos', (table) => {
      table.integer('clientes_id').notNullable().unsigned()
        .references('id')
        .inTable('clientes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }

  down () {
    this.table('enderecos',(table) => {
      table.dropColumn('clientes_id')
    })
  }
}

module.exports = ClienteEnderecoSchema
