import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { VerifyIfExistsProdutoById } from 'App/Service/VerifyIfExistProdutoById'

import Produto from 'App/Models/Produto'
import AppError from 'App/Exceptions/AppError'
import { CurrencyService } from 'App/Service/currencyService'


export default class ProdutosController {

    private currency:CurrencyService

    constructor(){
        this.currency = new CurrencyService()
    }

    public async index({ response }: HttpContextContract) {

        const produto = await Produto.query()
            .where("is_deleted", false)
            .orderBy("nome", 'asc')
        return response.json(produto)
    }

    public async store({ request, response }: HttpContextContract) {
        const {
            nome,
            titulo,
            descricao,
            preco
        } = request.body()

        const produto = await Produto.create({
            nome,
            titulo,
            descricao,
            preco: this.currency.execute(preco)
        })

        return response.json(produto)
    }

    public async update({ request, params, response }: HttpContextContract) {

        const {
            nome,
            titulo,
            descricao,
            preco
        } = request.body()

        const { id } = params

        const verifyProduto = new VerifyIfExistsProdutoById()
        const produto = await verifyProduto.execute(id)

        if(!produto)
            throw new AppError("doesn´t exist this produto!")

        if(produto){
            produto.nome = nome
            produto.titulo = titulo
            produto.descricao = descricao
            produto.preco = this.currency.execute(preco)

            await produto.save()

        }
        
        return response.ok(true)
    }

    public async show({ params, response }: HttpContextContract) {

        try {
            const produto = await Produto.query()
                .where("id", params.id)
                .where("is_deleted", false)
                .firstOrFail()

            return response.json(produto)

        } catch {
            throw new AppError("doesn´t exist this produto!")
        }
    }

    public async delete({ params, response }: HttpContextContract) {

        const { id } = params

        const verifyProduto = new VerifyIfExistsProdutoById()
        const produto = await verifyProduto.execute(id)

        if(!produto)
            throw new AppError("doesn´t exist this produto!")

        if(produto){
             produto.isDeleted = true
             await produto.save()
        }
       

        return response.ok(true)
    }
}
