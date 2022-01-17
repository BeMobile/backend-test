import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Cliente from 'App/Models/Cliente'

export default class ClientesController {
  public async index({}: HttpContextContract) {
    const clientes = await Database
    .query()
    .select('*')
    .from('clientes')
    .orderBy('id', 'asc')
    return clientes
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['nome', 'cpf'])

    return await Cliente.create(data)
  }

  public async show({ params }: HttpContextContract) {
    const clientes = await Database
    .query()
    .select('*')
    .from('clientes')
    .leftJoin('vendas', 'clientes.id', 'vendas.clientes_id')
    .orderBy('data', 'desc')
    .where('clientes.id', params.id )
    return clientes
  }

  public async update({ params, request }: HttpContextContract) {
    const clientes = await Cliente.findOrFail(params.id)

    const data = request.only(['nome', 'cpf'])
    clientes.merge(data)
    await clientes.save()

    return clientes
  }

  public async destroy({ params }: HttpContextContract) {
    const clientes = await Cliente.findOrFail(params.id)

    await clientes.delete()

    return {
      message: 'Cliente deletado!'
    }
  }
}
