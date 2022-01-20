import { inject, injectable } from "tsyringe";
import { AppError } from "../../errors/AppError";
import { Client } from "../../models/Client";
import { IClientsRepository } from "../../repositories/IClientsRepository";

interface ICreateClient {
  name: string;
  phone: number;
  cpf: number;
  email: string;
  address: string;
  city: string;
}

@injectable()
class CreateClientService {
  constructor(
    @inject("ClientsRepository")
    private clientsRepository: IClientsRepository
  ) {}

  async execute({
    name,
    phone,
    cpf,
    email,
    address,
    city
  }: ICreateClient): Promise<Client> {
    const emailExists = await this.clientsRepository.findByEmail(email);

    if (emailExists) throw new AppError("Client already exists");

    const cpfExists = await this.clientsRepository.findByCPF(cpf);

    if (cpfExists) throw new AppError("Client already exists");

    const client: Client = await this.clientsRepository.create({
      name,
      phone,
      cpf,
      email,
      address,
      city
    });

    return client;
  }
}

export { CreateClientService };