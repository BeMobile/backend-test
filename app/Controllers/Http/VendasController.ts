import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Venda from 'App/Models/Venda'

export default class VendasController {
  public async index({}: HttpContextContract) {}

  public async store({ request }: HttpContextContract) {
    const data = request.only(['quantidade', 'preco_unitario', 'preco_total', 'data', 'clientes_id', 'produtos_id'])

    return await Venda.create(data)
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
