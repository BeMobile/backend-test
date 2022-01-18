'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VendaClienteSchema extends Schema {
  up () {
    this.table('clientes', (table) => {
      table.integer('venda_id').notNullable().unsigned()
        .references('id')
        .inTable('vendas')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }

  down () {
    this.table('clientes',(table) => {
      table.dropColumn('venda_id')
    })
  }
}

module.exports = VendaClienteSchema
