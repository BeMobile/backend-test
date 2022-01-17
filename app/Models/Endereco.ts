import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Endereco extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public cep: string

  @column()
  public logradouro: string

  @column()
  public bairro: string

  @column()
  public numero: string

  @column()
  public complemento: string

  @column()
  public uf: string

  @column()
  public clientes_id: number


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  belongsTo: any

  cliente () {
    return this.belongsTo('App/Models/Cliente')
  }
}
