'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProdutosSchema extends Schema {
  up () {
    this.create('produtos', (table) => {
      table.increments()
      table.string('nome').notNullable()
      table.decimal('valor').notNullable()
      table.string('autor').notNullable()
      table.string('categoria')
      table.timestamps()
    })
  }

  down () {
    this.drop('produtos')
  }
}

module.exports = ProdutosSchema
