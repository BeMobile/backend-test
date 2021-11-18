import { Client, ClientOutputDTO } from "../model/Client";
import { BaseDatabase } from "./BaseDatabase";

export class ClientDatabase extends BaseDatabase {

    async createClient(
        id: string,
        nome: string,
        cpf: string,
        telefone: string,
        email: string,
        logradouro: string,
        numero: number,
        complemento: string,
        bairro: string,
        cep: string,
        cidade: string,
        estado: string
    ): Promise<void> {
        try {
            await this.getConnection()
                .insert({
                    id,
                    nome,
                    cpf,
                    telefone,
                    email,
                    logradouro,
                    numero,
                    complemento,
                    bairro,
                    cep,
                    cidade,
                    estado
                })
                .into(this.TABLE_NAME.CLIENTES)

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }


    async getAllClient(): Promise<ClientOutputDTO[]> {
        try {
            const result = await this.getConnection()
                .select("id", "nome", "telefone", "email", "cpf")
                .into(this.TABLE_NAME.CLIENTES)
                .orderBy("id")

            return result

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async updateClient(
        id: string,
        nome: string,
        cpf: string,
        telefone: string,
        email: string,
        logradouro: string,
        numero: number,
        complemento: string,
        bairro: string,
        cep: string,
        cidade: string,
        estado: string
    ): Promise<void> {
        try {
            await this.getConnection()
                .where("id", id)
                .update({
                    nome,
                    cpf,
                    telefone,
                    email,
                    logradouro,
                    numero,
                    complemento,
                    bairro,
                    cep,
                    cidade,
                    estado
                })
                .into(this.TABLE_NAME.CLIENTES)

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async getShowClient(clienteId: string): Promise<ClientOutputDTO[]> {
        try {
            const result = await this.getConnection()
                .raw(`
                select * , venda.id as idVenda, produto.id as idProduto, cliente.id as idCliente
                FROM ${this.TABLE_NAME.VENDAS} as venda
                LEFT JOIN ${this.TABLE_NAME.CLIENTES} as cliente ON cliente.id = venda.id_cliente
                LEFT JOIN ${this.TABLE_NAME.PRODUTOS} as produto ON produto.id = venda.id_produto
                WHERE venda.id_cliente = "${clienteId}"
                ORDER BY data DESC
                `)

            return result[0]
                .map((data: any) => ({
                    cliente:{
                        id: data.idCliente,
                        nome: data.nome,
                        cpf: data.cpf,
                        telefone: data.telefone,
                        email: data.email,
                        endereco:{
                            logradouro: data.logradouro,
                            numero: data.numero,
                            complemento: data.complemento,
                            bairro: data.bairro,
                            cep: data.cep,
                            cidade: data.cidade,
                            estado: data.estado
                        }
                    },
                    vendas: {
                        id: data.idVenda,
                        idProduto: data.idProduto,
                        quantidade: data.quantidade,
                        precoUnid: data.preco_unid,
                        precoTotal: data.preco_total,
                        data: data.data
                    }
                }))

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

}