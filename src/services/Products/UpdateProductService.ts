import { inject, injectable } from "tsyringe";

import { AppError } from "../../errors/AppError";
import { Product } from "../../models/Product";
import { IProductsRepository } from "../../repositories/IProductsRepository";

interface IUpdateClient {
  id: string;
  name?: string;
  price?: number;
  category?: string;
  description?: string;
}

@injectable()
class UpdateProductService {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  async execute({
    id,
    name,
    description,
    category,
    price
  }: IUpdateClient): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    if (!product) throw new AppError("Product not found");

    product.name = name ? name : product.name;
    product.price = price ? price : product.price;
    product.description = description ? description : product.description;
    product.category = category ? category : product.category;

    const updatedProduct = await this.productsRepository.updateProduct(product);

    return updatedProduct;
  }
}

export { UpdateProductService };