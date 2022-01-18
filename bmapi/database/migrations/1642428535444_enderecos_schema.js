'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EnderecosSchema extends Schema {
  up () {
    this.create('enderecos', (table) => {
      table.increments()
      table.string('rua').notNullable()
      table.integer('numero').notNullable()
      table.string('cep').notNullable()
      table.string('bairro').notNullable()
      table.string('cidade').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('enderecos')
  }
}

module.exports = EnderecosSchema
