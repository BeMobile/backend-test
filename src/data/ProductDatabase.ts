import { FileWatcherEventKind } from "typescript";
import { ProductOutputDTO } from "../model/Product";
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
            .into(this.TABLE_NAME.PRODUTOS)
            
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    async getPriceProduct(id: string): Promise<ProductOutputDTO[]>{
        try {
            const result = await this.getConnection()
            .where("id",id)
            .select("preco")
            .into(this.TABLE_NAME.PRODUTOS)

            return result[0].preco

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}