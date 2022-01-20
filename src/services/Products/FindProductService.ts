import { inject, injectable } from "tsyringe";

import { AppError } from "../../errors/AppError";
import { Product } from "../../models/Product";
import { IProductsRepository } from "../../repositories/IProductsRepository";

@injectable()
class FindProductService {
  constructor(
    @inject("ProductsRepository")
    private productService: IProductsRepository
  ) {}

  async execute(id: string): Promise<Product> {
    const product = await this.productService.findById(id);

    if (!product) throw new AppError("Product not found");

    return product;
  }
}

export { FindProductService };