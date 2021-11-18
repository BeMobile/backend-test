import { Client, ClientOutputDTO } from "../model/Client";
import { BaseDatabase } from "./BaseDatabase";

export class ClientDatabase extends BaseDatabase {

        async createClient(
            id: string,
            nome: string,
            cpf: string,
            telefone:  string,
            email: string,
            logradouro: string,
            numero: number,
            complemento: string,
            bairro: string,
            cep: string,
            cidade: string,
            estado: string
        ): Promise<void>{
            try {
                await this.getConnection()
                .insert({
                    id,
                    nome,
                    cpf , 
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


        async getAllClient(): Promise<ClientOutputDTO[]>{
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
        ): Promise<void>{
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

        async getShowClient(clienteId: string): Promise<ClientOutputDTO[]>{
            try {
                const result = await this.getConnection()
                .raw(`
                select v.id as id,
                c.id as clienteId,
                p.id as produtoId,
                c.nome as nomeCliente,
                p.titulo as tituloProduto
                FROM ${this.TABLE_NAME.VENDAS} v
                LEFT JOIN ${this.TABLE_NAME.CLIENTES} c ON c.id = v.id_cliente
                LEFT JOIN ${this.TABLE_NAME.PRODUTOS} p ON p.id = v.id_produto
                WHERE v.id_cliente = "${clienteId}"
                ORDER BY data DESC
                `)

                return result
                
            } catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        }
    
}