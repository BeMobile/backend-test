import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Vendas extends BaseSchema {
  protected tableName = 'vendas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('cliente_id').unsigned().references('id').inTable('clientes').onDelete("CASCADE")
      table.integer('produto_id').unsigned().references('id').inTable('produtos')
      table.integer('quantidade').notNullable()
      table.string('preco_unitario').notNullable()
      table.string('preco_total').notNullable()
      table.time("hora")
      table.date('data')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
