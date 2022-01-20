import { inject, injectable } from "tsyringe";
import { AppError } from "../../errors/AppError";

import { Sale } from "../../models/Sale";
import { IClientsRepository } from "../../repositories/IClientsRepository";
import { IProductsRepository } from "../../repositories/IProductsRepository";
import { ISalesRepository } from "../../repositories/ISalesRepository";

interface ICreateSale {
  id?: string;
  quantity: number;
  total_price?: number;
  client_id: string;
  product_id: string;
}

@injectable()
class CreateSaleService {
  constructor(
    @inject("SalesRepository")
    private salesRepository: ISalesRepository,

    @inject("ClientsRepository")
    private clientsRepository: IClientsRepository,

    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  async execute({
    quantity,
    total_price,
    client_id,
    product_id
  }: ICreateSale): Promise<Sale> {
    const client = await this.clientsRepository.findById(client_id);

    if (!client) throw new AppError("Client not found");

    const product = await this.productsRepository.findById(product_id);

    if (!product) throw new AppError("Product not found");

    total_price = product.price * quantity;

    const sale: Sale = await this.salesRepository.create({
      quantity,
      total_price,
      client_id,
      product_id
    });

    return sale;
  }
}

export { CreateSaleService };