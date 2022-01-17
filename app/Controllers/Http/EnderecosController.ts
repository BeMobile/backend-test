import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Endereco from 'App/Models/Endereco'

export default class EnderecosController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({ request }: HttpContextContract) {
    const data = request.only(['cep', 'logradouro', 'bairro', 'numero', 'complemento', 'uf', 'clientes_id'])

    return await Endereco.create(data)
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
