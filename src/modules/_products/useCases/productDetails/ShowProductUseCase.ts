import { inject, injectable } from "tsyringe";
import { Products } from "../../entities/Products";
import { IProductsRepository } from "../../repositories/IProductsRepository";

@injectable()
class ShowProductUseCase {

  constructor(
    @inject("ProductsRepository")
    private productRepositiry:IProductsRepository) {}

    async execute(id: string): Promise<Products> {
      const showProducts = await this.productRepositiry.listDetail(id)
      return showProducts
      
    }

}

export { ShowProductUseCase }
