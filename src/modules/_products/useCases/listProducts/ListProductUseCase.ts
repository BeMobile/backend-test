import { inject, injectable } from "tsyringe";
import { Products } from "../../entities/Products";
import { IProductsRepository } from "../../repositories/IProductsRepository";

@injectable()
class ListProductUseCase {

  constructor(
    @inject("ProductsRepository")
    private productRepositiry:IProductsRepository) {}

    async execute(): Promise<Products[]> {
      const products = await this.productRepositiry.list()

      return products
    }

}

export { ListProductUseCase }
