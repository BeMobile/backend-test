import { getRepository, Repository } from "typeorm";
import { Sales } from "../entities/Sales";
import { ICreateSalesDTO, ISalesRepository } from "./ISalesRepository";


class SalesRepository implements ISalesRepository {

  private repository: Repository<Sales>

  constructor() {
     this.repository = getRepository(Sales)
  }

  async create({ 
    id_client, 
    id_product, 
    quantity, 
    total_price 
  }: ICreateSalesDTO): Promise<void> {
    const sale = this.repository.create({
      id_client,
      id_product,
      quantity,
      total_price
    })
    await this.repository.save(sale)

  }
  async listDetails(id: string): Promise<Sales> {
    const sale = this.repository.findOne({ id })

    return sale
  }

}

export { SalesRepository }