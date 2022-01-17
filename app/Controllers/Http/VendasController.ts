import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { SetTimeHoursZone } from 'App/Service/setTimeHoursZone'
import { SetTimeDateZone } from 'App/Service/setTimeDateZone'
import { CurrencyService } from '../../Service/currencyService'

import Venda from 'App/Models/Venda'
import AppError from 'App/Exceptions/AppError'

export default class VendasController {
   
    private currency:CurrencyService

    constructor(){
        this.currency= new CurrencyService()
    }

    public async index({ response }: HttpContextContract){

       return response.json(await Venda.all())
    }
  
    public async store({request, params, response }: HttpContextContract){
         const { 
                quantidade,
                preco_unitario,
                preco_total,
               }=request.body()

                const { clienteId, produtoId } = params
                const setTimeDateZone=new SetTimeDateZone()
                const setTimeHoursZone=new SetTimeHoursZone()

                const datetime=new Date()
                const hours=setTimeHoursZone.execute(datetime)
                const time=setTimeDateZone.execute(datetime)
               
             
                   

            try {
                const cliente = await Venda.create({ 
                    quantidade,
                    preco_unitario:this.currency.execute(preco_unitario),
                    preco_total:this.currency.execute(preco_total),
                    clienteId, 
                    produtoId,
                    hora:hours,
                    data:time
                })

                return response.json(cliente)
    
            } catch {
                throw new AppError("não existe produto ou cliente associado!")
            }
          
       
    }
}
