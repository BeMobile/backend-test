import { User } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {

    async createUser(
        id: string,
        nome: string,
        email: string,
        senha: string
    ): Promise<void>{
        try {
            await this.getConnection()
            .insert({
                id,
                nome,
                email,
                senha
            })
            .into(this.TABLE_NAME.USUARIOS)
            
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}