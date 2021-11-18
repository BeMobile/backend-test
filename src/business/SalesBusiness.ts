import { ProductDatabase } from './../data/ProductDatabase';
import { Sales } from './../model/Sales';
import { SalesDatabase } from "../data/SalesDatabase";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { StoreInputDTO } from "../model/Sales";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

const tokenManager = new Authenticator();
const idGenerator = new IdGenerator();

export class SalesBusiness {
    async storeProduct(input: StoreInputDTO, token: string){
        try {
            if (!token) {
                throw new UnauthorizedError("Usuário não autorizado")
            }

            tokenManager.getData(token)

            if (!input.quantidade || !input.idCliente || !input.idProduto ) {
                throw new Error("Preencha todos os campos para registro do produto");
            }

            const productDatabase = new ProductDatabase()
            const precoUnid = await productDatabase.getPriceProduct(input.idProduto)

            const id = idGenerator.generate();

            await new SalesDatabase().createSales(
                Sales.toSalesModel({
                    ...input,
                    id, 
                    precoUnid
                })
            )
            
        } catch (error) {
            throw new Error(error.message)
        }
    }
}