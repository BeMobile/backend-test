'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VendaProdSchema extends Schema {
  up () {
    this.table('produtos', (table) => {
      table.integer('vendas_id').unsigned()
        .references('id')
        .inTable('vendas')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }

  down () {
    this.table('produtos',(table) => {
      table.dropColumn('vendas')
    })
  }
}

module.exports = VendaProdSchema
