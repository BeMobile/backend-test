import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


import Endereco from 'App/Models/Endereco'

export default class EnderecosController {

    public async index({ response }: HttpContextContract) {

        const endereco = await Endereco.query()
              .orderBy("created_at", 'desc')
        return response.json(endereco)
    }

    public async store({ request, response }: HttpContextContract) {
        const {
            rua,
            numero,
            cidade,
            cep,
            uf
        } = request.body()

        const endereco = await Endereco.create({
            rua,
            numero,
            cidade,
            cep,
            uf
        })

        return response.json(endereco)
    }
}
