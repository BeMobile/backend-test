import { inject, injectable } from "tsyringe";
import { IClientsRepository } from "../../../_clients/repositories/IClientsRepository";
import { Sales } from "../../entities/Sales";
import { ISalesRepository } from "../../repositories/ISalesRepository";

@injectable()
class ShowSalesUseCase {

  constructor(
    @inject("ClientsRepository")
    private clientRepository: IClientsRepository,
    @inject("SalesRepository")
    private salesRepository: ISalesRepository
    
    ) {}
    async execute(id: string):Promise<Sales> {
      
      const sale = await this.salesRepository.listDetails(id);

      const client = await this.clientRepository.list()

      return sale;
    }
}

export { ShowSalesUseCase }