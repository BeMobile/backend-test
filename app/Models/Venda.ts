import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Venda extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public clienteId: number

  @column()
  public produtoId: number
  
  @column()
  public quantidade: number
  
  @column()
  public preco_unitario: string

  @column()
  public preco_total: string
  
  @column()
  public hora: Date | string
  
  @column()
  public data: Date | string
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
