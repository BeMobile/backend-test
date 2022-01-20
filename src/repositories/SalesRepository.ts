import { getRepository, Repository } from "typeorm";

import { Sale } from "../models/Sale";
import { ISalesRepository } from "./ISalesRepository";

interface ICreateSale {
  quantity: number,
  total_price: number,
  client_id: string,
  product_id: string
}

class SalesRepository implements ISalesRepository {
  private repository: Repository<Sale>;

  constructor() {
    this.repository = getRepository(Sale);
  }

  async create({
    quantity,
    total_price,
    client_id,
    product_id
  }: ICreateSale): Promise<Sale> {
    const sale = this.repository.create({
      quantity,
      total_price,
      client_id,
      product_id
    });

    await this.repository.save(sale);

    return sale;
  }

  async findById(id: string): Promise<Sale> {
    return await this.repository.findOne({ id });
  }

  async findByClient(client_id: string): Promise<Sale[]> {
    const sales = await this.repository.find({
      where: { client_id },
      relations: ["client"],
    });

    return sales;
  }

  async deleteSaleByClientId(client_id: string): Promise<void> {
    await this.repository.delete({ client_id });
  }
  
}

export { SalesRepository };