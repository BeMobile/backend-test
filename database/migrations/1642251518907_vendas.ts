import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Vendas extends BaseSchema {
  protected tableName = 'vendas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('quantidade').notNullable()
      table.decimal('preco_unitario', 12, 2).notNullable()
      table.decimal('preco_total', 12, 2).notNullable()
      table.dateTime('data').notNullable()
      table.integer('clientes_id').unsigned().references('id').inTable('clientes').notNullable().onDelete('cascade')
      table.integer('produtos_id').unsigned().references('id').inTable('produtos').notNullable().onDelete('cascade')
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
