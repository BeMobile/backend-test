import { getRepository, Repository } from "typeorm";
import { Clients } from "../entities/Clients";
import { IClientsRepository, ICreateClientDTO } from "./IClientsRepository";

class ClientsRepository implements IClientsRepository {

  private repository: Repository<Clients>;

  constructor() {
    this.repository = getRepository(Clients)
  }

  async create({ nome, cpf, telefone, rua, numero, bairro, cidade, cep }: ICreateClientDTO): Promise<void> {
    const client = this.repository.create({ 
      nome, 
      cpf,
      telefone, 
      rua, 
      numero, 
      bairro, 
      cidade, 
      cep
    });
    await this.repository.save(client);
  }

  async list(): Promise<Clients[]> {
    const client = await this.repository.find()

    return client
  }

  async findByCpf(cpf: string): Promise<Clients>{
    const findCpf = await this.repository.findOne({ cpf })
    return findCpf
  }
}

export { ClientsRepository }