import { Clients } from "../../model/Clients";
import { ClientsRepository } from "../../repositories/ClientsRepository";

class ListClientUseCase {
  constructor(private clientRepository: ClientsRepository) {}

  execute(): Clients[] {
    const clients = this.clientRepository.list()

    return clients;
  }
}

export { ListClientUseCase }