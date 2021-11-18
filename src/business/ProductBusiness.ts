import { ProductDatabase } from "../data/ProductDatabase";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { StoreInputDTO } from "../model/Product";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

const tokenManager = new Authenticator();
const idGenerator = new IdGenerator();

export class ProductBusiness {
    async storeProduct(input: StoreInputDTO){
        try {
            if (!input.token) {
                throw new UnauthorizedError("Usuário não autorizado")
            }

            const tokenData = tokenManager.getData(input.token)

            if (!input.titulo || !input.editora || !input.edicao || !input.anoPublicacao || !input.autores || !input.assunto || !input.preco) {
                throw new Error("Preencha todos os campos para registro do produto");
            }

            const id = idGenerator.generate();

            await new ProductDatabase().createProduct(
                id,
                input.titulo,
                input.editora,
                input.edicao,
                input.anoPublicacao,
                input.autores,
                input.assunto,
                input.preco
            )
            
        } catch (error) {
            throw new Error(error.message)
        }
    }
}