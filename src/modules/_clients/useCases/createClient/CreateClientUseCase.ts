import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IAddressRepository } from "../../repositories/IAddressRepository";
import { IClientsRepository } from "../../repositories/IClientsRepository";

interface IRequest {
  nome: string;
  cpf: string;
  telefone: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  cep: string;
}
@injectable()
class CreateClientUseCase {
  constructor(
  @inject("ClientsRepository")  
  private clientRepository: IClientsRepository
  ) {

  }
  async execute({
    nome, 
    cpf, 
    telefone, 
    rua, 
    numero, 
    bairro, 
    cidade, 
    cep }: IRequest):Promise<void>  
    {
    const clientAllreadyExists = await this.clientRepository.findByCpf(cpf);

    if(clientAllreadyExists) {
      throw new AppError("O CPF informado já está em uso!")
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