import { inject, injectable } from "tsyringe";
import { IProductsRepository } from "../../repositories/IProductsRepository";

@injectable()
class DeletedProductUseCase {

  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository) {}

  async execute(id: string, deleted = true) {

    const productDeleted = await this.productsRepository.deletedProduct(id , deleted);
    
    return productDeleted
  }
}

export { DeletedProductUseCase }