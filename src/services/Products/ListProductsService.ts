import { inject, injectable } from "tsyringe";
import { Product } from "../../models/Product";
import { IProductsRepository } from "../../repositories/IProductsRepository";


@injectable()
class ListProductsService {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  async execute(): Promise<Product[]> {
    const products = await this.productsRepository.listProducts();

    return products;
  }
}

export { ListProductsService };