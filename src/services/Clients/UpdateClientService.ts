import { inject, injectable } from "tsyringe";
import { AppError } from "../../errors/AppError";
import { Client } from "../../models/Client";
import { IClientsRepository } from "../../repositories/IClientsRepository";

interface IUpdateClient {
  id: string;
  name?: string;
  phone?: number;
  email?: string;
  address?: string;
  city?: string;
}

@injectable()
class UpdateClientService {
  constructor(
    @inject("ClientsRepository")
    private clientsRepository: IClientsRepository
  ) {}

  async execute({
    id,
    name,
    phone,
    email,
    address,
    city
  }: IUpdateClient): Promise<Client> {
    const client = await this.clientsRepository.findById(id);

    if (!client) throw new AppError("Client doest not exists");

    client.name = name ? name : client.name;
    client.phone = phone ? phone : client.phone;
    client.email = email ? email : client.email;
    client.address = address ? address : client.address;
    client.city = city ? city : client.city;
    
    const updatedClient = await this.clientsRepository.updateClient(client)

    return updatedClient;
  }
}

export { UpdateClientService };