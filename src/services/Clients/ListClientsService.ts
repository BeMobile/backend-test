import { inject, injectable } from "tsyringe";

import { Client } from "../../models/Client";
import { IClientsRepository } from "../../repositories/IClientsRepository";

@injectable()
class ListClientsService {

  constructor(
    @inject("ClientsRepository")
    private clientsRepository: IClientsRepository
  ) {}
  
  async execute(): Promise<Client[]> {
    const clients = await this.clientsRepository.listClients();

    return clients;
  }
}

export { ListClientsService };