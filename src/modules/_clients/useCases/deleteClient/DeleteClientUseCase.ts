import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IClientsRepository } from "../../repositories/IClientsRepository";

@injectable()
class DeleteClientUseCase {

  constructor(
    @inject("ClientsRepository")
    private clientsRepository: IClientsRepository){}

  async execute(id: string): Promise<void> {
    
    await this.clientsRepository.deleteClient(id)
  }
}

export { DeleteClientUseCase }