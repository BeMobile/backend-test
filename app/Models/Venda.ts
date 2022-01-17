import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Venda extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public quantidade: string

  @column()
  public preco_unitario: number

  @column()
  public preco_total: number

  @column()
  public data: DateTime

  @column()
  public clientes_id: number

  @column()
  public produtos_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  belongsTo: any

  cliente () {
    return this.belongsTo('App/Models/Cliente')
  }

  produto () {
    return this.belongsTo('App/Models/Produto')
  }
}
