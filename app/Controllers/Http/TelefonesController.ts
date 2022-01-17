import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Telefone from 'App/Models/Telefone'

export default class TelefonesController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({ request }: HttpContextContract) {
    const data = request.only(['numero_telefone', 'cliente_id'])

    return await Telefone.create(data)
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
