'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClienteOutroSchema extends Schema {
  up () {
    this.table('vendas', (table) => {
      table.integer('cliente_id').notNullable().unsigned()
        .references('id')
        .inTable('clientes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }

  down () {
    this.table('vendas',(table) => {
      table.dropColumn('cliente_id')
    })
  }
}

module.exports = ClienteOutroSchema
