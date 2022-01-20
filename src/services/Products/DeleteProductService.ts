import { inject, injectable } from "tsyringe";

import { IProductsRepository } from "../../repositories/IProductsRepository";

@injectable()
class DeleteProductService {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  async execute(id: string) {
    const product = await this.productsRepository.deleteProduct(id);

    return product;
  }
}

export { DeleteProductService };