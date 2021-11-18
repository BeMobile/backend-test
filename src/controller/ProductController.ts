import { Request, Response } from "express";
import { ProductBusiness } from "../business/ProductBusiness";
import { StoreInputDTO } from "../model/Product";

export class ProductController {

    async storeProduct(req: Request, res: Response){
        try {
            const token: string = req.headers.authorization;

            const input: StoreInputDTO = {
                titulo: req.body.titulo,
                editora: req.body.editora,
                edicao: req.body.edicao,
                anoPublicacao: req.body.anoPublicacao,
                autores: req.body.autores,
                assunto: req.body.assunto,
                preco: req.body.preco
            }

            const productBusiness = new ProductBusiness()

            await productBusiness.storeProduct(input, token)

            res.status(201).send("Produto cadastrado")

        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }

    async getPriceProduct(req: Request, res: Response){
        try {
            const token: string = req.headers.authorization;

            const id = req.params.id

            const productBusiness = new ProductBusiness()

            const result = await productBusiness.getPriceProduct(id, token)

            res.status(201).send(result)

        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }
}