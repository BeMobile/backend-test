import { UpdateInputDTO } from './../model/Client';
import { ClientDatabase } from './../data/ClientDatabase';
import { UnauthorizedError } from './../error/UnauthorizedError';
import { Authenticator } from './../services/Authenticator';
import { Client, ClientInputDTO } from "../model/Client";
import { IdGenerator } from '../services/IdGenerator';
import { CEP_REGEX, CPF_REGEX, EMAIL_REGEX, PHONE_REGEX } from '../services/regexValidar';

const tokenManager = new Authenticator();
const idGenerator = new IdGenerator();

export class ClientBusiness {

    async storeClient(input: ClientInputDTO) {

        try {

            if (!input.token) {
                throw new UnauthorizedError("Usuário não autorizado")
            }

            const tokenData = tokenManager.getData(input.token)

            if (!input.nome || !input.cpf || !input.telefone || !input.email || !input.logradouro || !input.numero || !input.bairro || !input.cep || !input.cidade || !input.estado) {
                throw new Error("Preencha todos os campos para registro do cliente");
            }

            if (EMAIL_REGEX.test(input.email) === false) {
                throw new Error("O formato do email é inválido")
            }

            if (PHONE_REGEX.test(input.telefone) === false) {
                throw new Error("O formato do phone é inválido. Insira nesse formato (xx) xxxxx-xxxx")
            }

            if (CPF_REGEX.test(input.cpf) === false) {
                throw new Error("CPF inválido")
            }

            if (CEP_REGEX.test(input.cep) === false) {
                throw new Error("Cep inválido")
            }

            if (input.nome.length < 10) {
                throw new Error("O nome deve ter, no mínimo, 10 caracteres");
            }

            const id = idGenerator.generate();

            await new ClientDatabase().createClient(
                id,
                input.nome,
                input.cpf,
                input.telefone,
                input.email,
                input.logradouro,
                input.numero,
                input.complemento,
                input.bairro,
                input.cep,
                input.cidade,
                input.estado
            );

        } catch (error) {
            throw new Error(error.message)
        }

    }

    async getAllClient(token: string) {

        try {

            if (!token) {
                throw new UnauthorizedError("Usuário não autorizado")
            }

            const tokenData = tokenManager.getData(token)

            const result = await new ClientDatabase().getAllClient();

            return result

        } catch (error) {
            throw new Error(error.message)
        }

    }

    async updateClient(input: UpdateInputDTO) {

        try {

            if (!input.token) {
                throw new UnauthorizedError("Usuário não autorizado")
            }

            const tokenData = tokenManager.getData(input.token)

            await new ClientDatabase().updateClient(
                input.id,
                input.nome,
                input.cpf,
                input.telefone,
                input.email,
                input.logradouro,
                input.numero,
                input.complemento,
                input.bairro,
                input.cep,
                input.cidade,
                input.estado
            );


        } catch (error) {
            throw new Error(error.message)
        }

    }
}