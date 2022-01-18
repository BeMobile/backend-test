import { inject, injectable } from "tsyringe";
import { IClientsRepository } from "../../repositories/IClientsRepository";

interface IRequest {
  nome: string;
  cpf: string;
  telefone: string;
  rua: string;
  numero: number;
  bairro: string;
  cidade: string;
  cep: string;
}
@injectable()
class CreateClientUseCase {
  constructor(
  @inject("ClientsRepository")  
  private clientRepository: IClientsRepository) {

  }
  async execute({nome, cpf, telefone, rua, numero, bairro, cidade, cep }: IRequest):Promise<void>  {

    const clientAllreadyExists = await this.clientRepository.findByCpf(cpf);

    if(clientAllreadyExists) {
      throw new Error("Client with this CPF allready exists!")
    }
    await this.clientRepository.create(
      { 
        nome, 
        cpf, 
        telefone,
        rua, 
        numero, 
        bairro, 
        cidade, 
        cep
        } 
    );
  }
}

export { CreateClientUseCase }