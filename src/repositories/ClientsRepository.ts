import { getRepository, Repository } from "typeorm";
import { Client } from "../models/Client";
import { IClientsRepository, ICreateClient, IUpdateClient } from "./IClientsRepository";

class ClientsRepository implements IClientsRepository {
  private repository: Repository<Client>;

  constructor() {
    this.repository = getRepository(Client);
  }

  async create({
    name,
    phone,
    cpf,
    email,
    address,
    city
  }: ICreateClient): Promise<Client> {
    const client = this.repository.create({
      name,
      phone,
      cpf,
      email,
      address,
      city
    });

    await this.repository.save(client);

    return client;
  }

  async findByEmail(email: string): Promise<Client> {
    return await this.repository.findOne({ email });
  }

  async findById(id: string): Promise<Client> {
    return await this.repository.findOne({ id });
  }

  async findByCPF(cpf: number): Promise<Client> {
    return await this.repository.findOne({ cpf });
  }
  
  async listClients(): Promise<Client[]> {
    return await this.repository.find({
      select: ["id", "name", "phone", "cpf", "email"],
      order: {
        id: "ASC"
      }
    });
  }

  async updateClient({ id, name, phone, email, address, city }: IUpdateClient): Promise<Client> {
    await this.repository
      .createQueryBuilder()
      .update(Client)
      .set({ name: name, phone: phone, email: email, address: address, city: city })
      .where("id = :id", { id: id })
      .execute();

    const client = await this.repository.findOne({ id });

    return client;
  }

  async deleteClient(id: string): Promise<void> {
    await this.repository.delete({ id });
  }
}

export { ClientsRepository };