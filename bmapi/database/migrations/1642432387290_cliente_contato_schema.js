'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClienteContatoSchema extends Schema {
  up () {
    this.table('contatos', (table) => {
      table.integer('clientes_id').notNullable().unsigned()
        .references('id')
        .inTable('clientes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }

  down () {
    this.table('contatos',(table) => {
      table.dropColumn('clientes_id')
    })
  }
}

module.exports = ClienteContatoSchema
