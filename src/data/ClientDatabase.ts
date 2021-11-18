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
    
}