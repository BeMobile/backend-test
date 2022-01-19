import { inject, injectable } from "tsyringe";
import { Clients } from "../../entities/Clients";
import { IClientsRepository } from "../../repositories/IClientsRepository";

@injectable()
class ListClientUseCase {
  constructor(
  @inject("ClientsRepository")
  private clientRepository: IClientsRepository) {}

  async execute(): Promise<Clients[]> {
    const clients = await this.clientRepository.list()

    return clients
  }
}
export { ListClientUseCase }