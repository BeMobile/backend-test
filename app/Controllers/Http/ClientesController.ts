import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { VerifyIfExistsClient } from 'App/Service/VerifyIfExistClienteById'

import Cliente from 'App/Models/Cliente'
import Database from '@ioc:Adonis/Lucid/Database'
import AppError from 'App/Exceptions/AppError'



export default class ClientesController {
   
    public async index({ response }: HttpContextContract){

        const cliente = await Cliente.query()
                              .orderBy('id')
                              

        return response.json(cliente)
    }

    public async store({request, response }: HttpContextContract){
        const { nome, cpf }=request.body()

        const cliente = await Cliente.create({ nome,cpf })

        return response.json(cliente)
    }

    public async update({ request, params, response }: HttpContextContract){

       const { nome, cpf } = request.body()
       const { id } = params

       const verifyCliente=new VerifyIfExistsClient()
       const cliente=await verifyCliente.execute(id)

       if(!cliente)
            throw  new AppError('cliente não encontrado!',400)
       
       if(cliente){
           cliente.nome=nome
           cliente.cpf=cpf

           await cliente.save()
       }
     

       return response.ok(true)
    }

    public async show({ request, params,response }: HttpContextContract){
       
        const { ano, mes } = request.body()
       
        try {
                
            const cliente = await Cliente.query()
                                .where("id",params.id)
                                .preload("Telefone",(query)=>{
                                        query.select("id","numero")
                                })
                                .preload("vendas",(query)=>{
                                        if(mes)
                                        query.where(Database.raw(`DATE_FORMAT(data, "%m")`),'=',mes)
                                        if(ano)
                                        query.where(Database.raw(`DATE_FORMAT(data, "%Y")`),'=',ano)
                                        query.orderBy("created_at","desc")
                                    })
                                    .firstOrFail()
                                    

            return response.json(cliente)
        } catch  {
            throw  new AppError('cliente não encontrado!',400)
        }

    }

    public async delete({ params, response }: HttpContextContract){

        const { id } = params

        const verifyCliente=new VerifyIfExistsClient()
        const cliente=await verifyCliente.execute(id)

         if(!cliente)
             throw  new AppError('cliente não encontrado!',400)

         await cliente.delete()

        return response.ok(true)
    }
}
