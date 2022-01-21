import { getRepository, Repository } from "typeorm";
import { Clients } from "../entities/Clients";
import { IClientsRepository, ICreateClientDTO, IUpdateClientDTO } from "./IClientsRepository";

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
    const clientInfo = await this.repository.find({select:["id", "nome", "cpf", "telefone"], order: {id: "ASC" }});
    return clientInfo;
  }

  async findByCpf(cpf: string): Promise<Clients>{
    const findCpf = await this.repository.findOne({ cpf })
    return findCpf
  }

  async findById(id: string): Promise<Clients> {
    const findClientId = await this.repository.findOne({ id })

    return findClientId;
  }

  async updateClient({id, nome, telefone, rua, numero, bairro, cidade, cep}: IUpdateClientDTO): Promise<Clients>{
    await this.repository
    .createQueryBuilder()
    .update(Clients)
    .set({ nome: nome, telefone: telefone, rua: rua, numero: numero, bairro: bairro, cidade: cidade, cep: cep })
    .where("id = :id", {id: id})
    .execute()

    const clientUpdate = await this.repository.findOne({ id });

    return clientUpdate
  }

  async deleteClient(id: string): Promise<void> {
    await this.repository.delete({id})
  } 
}

export { ClientsRepository }