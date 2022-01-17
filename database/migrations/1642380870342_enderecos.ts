import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Enderecos extends BaseSchema {
  protected tableName = 'enderecos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('cep', 10).notNullable()
      table.string('logradouro', 255).notNullable()
      table.string('bairro', 100).notNullable()
      table.string('numero', 10).notNullable()
      table.string('complemento', 20)
      table.string('uf', 2).notNullable()
      table.integer('clientes_id').unsigned().references('id').inTable('clientes').notNullable().onDelete('cascade')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
