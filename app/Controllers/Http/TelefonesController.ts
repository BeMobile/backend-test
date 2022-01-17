import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AppError from 'App/Exceptions/AppError'

import Telefone from 'App/Models/Telefone'

export default class TelefonesController {

    public async index({ response }: HttpContextContract) {

        const telefone = await Telefone.query()
            .orderBy("created_at", 'desc')
        return response.json(telefone)
    }

    public async store({ request, response }: HttpContextContract) {
        const {
            numero, 
            clienteId
        } = request.body()
        
        try{
            const telefone = await Telefone.create({
                        numero,
                        clienteId
                    })

           return response.json(telefone)
        }catch{
            throw  new AppError('cliente não encontrado!',400)
        }
      
    }
}
