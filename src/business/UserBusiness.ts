import { UserDatabase } from '../data/UserDatabase';
import { Authenticator } from '../services/Authenticator';
import { HashManager } from '../services/HashManager';
import { IdGenerator } from '../services/IdGenerator';
import { EMAIL_REGEX } from '../services/regexValidar';
import { SignupInputDTO, User } from './../model/User';


export class UserBusiness {

    async signup(input: SignupInputDTO): Promise<string>{

        try {

            if (!input.nome || !input.email || !input.senha) {
                throw new Error("Preencha todos os campos para registro do usuário");
            }
    
            if(EMAIL_REGEX.test(input.email) === false){
                throw new Error("O formato do email é inválido")
            }
            
            if (input.senha.length < 6 || input.nome.length < 10) {
                throw new Error("O password deve ter, no mínimo, 6 caracteres e o name 10");
            }
    
            const idGenerator = new IdGenerator();
            const id = idGenerator.generate();
    
            const hashManager = new HashManager();
            const hashSenha = await hashManager.hash(input.senha);

            const userDatabase = new UserDatabase();
            await userDatabase.createUser(
                id,
                input.nome,
                input.email,
                hashSenha
            )

            const tokenManager = new Authenticator()
            const token = tokenManager.generateToken({id})

            return token;
            
        } catch (error) {
            throw new Error(error.message);
        }

    }
}