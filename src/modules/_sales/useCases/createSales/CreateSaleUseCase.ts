import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IClientsRepository } from "../../../_clients/repositories/IClientsRepository";
import { IProductsRepository } from "../../../_products/repositories/IProductsRepository";
import { ISalesRepository } from "../../repositories/ISalesRepository";


interface IRequest {
  id_client: string;
  id_product: string;
  quantity: number;
  total_price?: number;
}

@injectable()
class CreateSaleUseCase {

  constructor(
    @inject("SalesRepository")
    private salesRepository: ISalesRepository,
    @inject("ClientsRepository")
    private clientsRepository: IClientsRepository,
    @inject("ProductsRepository")
    private productRepositiry: IProductsRepository
    ) {}

  async execute({
    id_client,
    id_product,
    quantity,
    total_price
  }: IRequest): Promise<void>{

    const clientExists = await this.clientsRepository.findById(id_client);

    if(!clientExists) {
      throw new AppError("Cliente informado não existe!")
    }

    const productExists = await this.productRepositiry.findById(id_product);

    if(!productExists) {
      throw new AppError("Produto informado não existe!")
    }
      total_price = productExists.preco * quantity;

      const sale = await this.salesRepository.create({
        id_client,
        id_product,
        quantity,
        total_price
      });
      return sale;
  }
}

export { CreateSaleUseCase }