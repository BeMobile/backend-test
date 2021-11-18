import { BaseDatabase } from "./BaseDatabase";

export class ProductDatabase extends BaseDatabase {
    async createProduct(
        id: string,
        titulo: string,
        editora: string,
        edicao: string,
        anoPublicacao: string,
        autores: string,
        assunto: string,
        preco: number
    ): Promise<void>{
        try {
            await this.getConnection()
            .insert({
                id,
                titulo,
                editora,
                edicao,
                ano_publicacao: anoPublicacao,
                autores,
                assunto,
                preco
            })
            .into(this.TABLE_NAME.PRODUCTS)
            
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}