import { client } from "../model/Client";
import { BaseDatabase } from "./BaseDatabase";

export class ClientDatabase extends BaseDatabase {

        async createClient(client: client): Promise<void>{
            try {
                await this.getConnection()
                .insert({
                    id: client.id,
                    nome: client.nome,
                    cpf: client.cpf , 
                    telefone: client.telefone, 
                    email: client.email, 
                    logradouro: client.logradouro, 
                    numero: client.numero, 
                    complemento: client.complemento, 
                    bairro: client.bairro, 
                    cep: client.cep, 
                    cidade: client.cidade, 
                    estado: client.estado
                })
                .into(this.TABLE_NAME.CLIENTES)
                
            } catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        }
    
}