import { inject, injectable } from "tsyringe";
import { AppError } from "../../errors/AppError";

import { Sale } from "../../models/Sale";
import { IClientsRepository } from "../../repositories/IClientsRepository";
import { ISalesRepository } from "../../repositories/ISalesRepository";

@injectable()
class ListClientSalesService {
  constructor(
    @inject("SalesRepository")
    private salesRepository: ISalesRepository,

    @inject("ClientsRepository")
    private clientsRepository: IClientsRepository
  ) {}

  async execute(client_id: string,): Promise<Sale[]> {
    const clientExist = await this.clientsRepository.findById(client_id);
    
    if (!clientExist) throw new AppError("Client does not exist");

    const sales = await this.salesRepository.findByClient(client_id);

    return sales;
  }
}

export { ListClientSalesService };