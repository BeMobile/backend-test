import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { Clients } from "../../entities/Clients";
import { IClientsRepository } from "../../repositories/IClientsRepository";

interface IUpdateClientDTO {
  id: string;
  nome?: string;
  telefone?: string;
  rua?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  cep?: string;
}

@injectable()
class UpdateClientUseCase {

  constructor(
    @inject("ClientsRepository")
    private clientRepository: IClientsRepository) {}

  async execute({
    id,
    nome,
    telefone, 
    rua, 
    bairro, 
    numero, 
    cidade, 
    cep
  }: IUpdateClientDTO ): Promise<Clients> {
      const client = await this.clientRepository.findById(id)

      if(!client) {
        throw new AppError("Cliente não existe!")
      }

     client.nome = nome ? nome : client.nome
     client.telefone = telefone ? telefone : client.telefone
     client.rua = rua ? rua : client.rua
     client.bairro = bairro ? bairro : client.bairro
     client.numero = numero ? numero : client.numero
     client.cidade = cidade ? cidade : client.cidade
     client.cep = cep ? cep : client.cep

     const updateClient = await this.clientRepository.updateClient(client)

     return updateClient
  }
}

export { UpdateClientUseCase }