import { inject, injectable } from "tsyringe";

import { IClientsRepository } from "../../repositories/IClientsRepository";

@injectable()
class DeleteClientService {
  constructor(
    @inject("ClientsRepository")
    private clientsRepository: IClientsRepository
  ) {}

  async execute(id: number) {
    await this.clientsRepository.deleteClient(id);
  }
}

export { DeleteClientService };