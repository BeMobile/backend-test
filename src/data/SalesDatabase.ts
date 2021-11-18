import { Sales } from "../model/Sales";
import { BaseDatabase } from "./BaseDatabase";

export class SalesDatabase extends BaseDatabase {
    async createSales(sales: Sales): Promise<void>{
        try {
            await this.getConnection()
            .insert({
                id: sales.getId(),
                quantidade: sales.getQuantidade(),
                preco_unid: sales.getPrecoUnid(),
                preco_total: sales.getPrecoUnid()*sales.getQuantidade(),
                data: sales.getData(),
                id_cliente: sales.getIdCliente(),
                id_produto: sales.getIdProduto()
            })
            .into(this.TABLE_NAME.VENDAS)
            
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}