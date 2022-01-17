import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Telefone extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public numero_telefone: string

  @column()
  public cliente_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  belongsTo: any

  cliente () {
    return this.belongsTo('App/Models/Cliente')
  }
}
