import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Venda from './Venda'
import Telefone from './Telefone'

export default class Cliente extends BaseModel {
  @column({ isPrimary: true })
  public id: number

   @column()
   public nome:string

   @column()
   public cpf:string

   @hasMany(() => Venda,{ 
     foreignKey: 'clienteId'
  })
   public vendas: HasMany<typeof Venda>

   @hasMany(() => Telefone,{ 
    foreignKey: 'clienteId'
 })
  public Telefone: HasMany<typeof Telefone>
 
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
