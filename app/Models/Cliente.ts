import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Cliente extends BaseModel {
  [x: string]: any
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public cpf: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  vendas () {
    return this.hasMany('App/Models/Venda')
  }

  endereco () {
    return this.hasMany('App/Models/Endereco')
  }

  telefone () {
    return this.hasMany('App/Models/Telefone')
  }
}
