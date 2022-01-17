import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Telefones extends BaseSchema {
  protected tableName = 'telefones'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('numero_telefone', 100).notNullable()
      table.integer('cliente_id').unsigned().references('id').inTable('clientes').notNullable().onDelete('cascade')
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
