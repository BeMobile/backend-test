import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Produto from 'App/Models/Produto'

export default class ProdutosController {
  public async index({}: HttpContextContract) {
    const produtos = await Database
    .query()
    .select('*')
    .from('produtos')
    .where('is_deleted', false)
    .orderBy('nome', 'asc')
    return produtos
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['isbn', 'nome', 'ano', 'preco'])
    return await Produto.create(data)
  }

  public async show({ params }: HttpContextContract) {
    return await Produto.findOrFail(params.id)
  }

  public async edit({}: HttpContextContract) {}

  public async update({ params, request }: HttpContextContract) {
    const produtos = await Produto.findOrFail(params.id)

    const data = request.only(['isbn', 'nome', 'ano', 'preco', 'is_deleted'])
    produtos.merge(data)
    await produtos.save()

    return produtos
  }

  public async destroy({ params, response }: HttpContextContract) {
    const produtos = await Produto.findOrFail(params.id)

    produtos.merge({is_deleted: true})
    await produtos.save()
    return response.json({message: 'Produto deletado!'})
  }
}
