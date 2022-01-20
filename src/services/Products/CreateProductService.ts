import { inject, injectable } from "tsyringe";
import { AppError } from "../../errors/AppError";
import { Product } from "../../models/Product";

import { IProductsRepository } from "../../repositories/IProductsRepository";

interface ICreateProduct {
  name: string;
  price: number;
  category: string;
  description: string;
}

@injectable()
class CreateProductService {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  async execute({
    name,
    price,
    category,
    description
  }: ICreateProduct): Promise<Product> {
    const productExists = await this.productsRepository.findByName(name);

    if (productExists) throw new AppError("Product already exists");

    const product: Product = await this.productsRepository.create({
      name,
      price,
      category,
      description
    });

    return product;
  }
}

export { CreateProductService };