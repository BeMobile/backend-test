import dayjs from "dayjs";
import { Request, Response } from "express";
import { SalesBusiness } from "../business/SalesBusiness";
import { StoreInputDTO } from "../model/Sales";

export class SalesController {

    async storeSales(req: Request, res: Response){
        try {
            const token: string = req.headers.authorization;

            const input: StoreInputDTO = {
                quantidade: req.body.quantidade,
                idCliente: req.body.idCliente,
                idProduto: req.body.idProduto
            }

            const productBusiness = new SalesBusiness()

            await productBusiness.storeProduct(input, token)

            res.status(201).send("Venda cadastrada")

        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }
}