'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VendasSchema extends Schema {
  up () {
    this.create('vendas', (table) => {
      table.increments()
      table.integer('quantidade').notNullable().unsigned()
      table.decimal('valoruni').notNullable()
      table.decimal('valortotal').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('vendas')
  }
}

module.exports = VendasSchema
