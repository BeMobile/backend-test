import { getRepository, Repository } from "typeorm";

import { Product } from "../models/Product";
import { ICreateProduct, IProductsRepository, IUpdateProduct } from "./IProductsRepository";

class ProductsRepository implements IProductsRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = getRepository(Product);
  }

  async create({
    name,
    price,
    category,
    description
  }: ICreateProduct): Promise<Product> {
    const product = this.repository.create({
      name,
      price,
      category,
      description
    });

    await this.repository.save(product);

    return product;
  }

  async findById(id: string): Promise<Product> {
    return await this.repository.findOne({ id });
  }

  async findByName(name: string): Promise<Product> {
    return await this.repository.findOne({ name });
  }

  async listProducts(): Promise<Product[]> {
    const products = await this.repository.find({
      select: ["name", "price", "description"],
      order: {
        name: "ASC"
      }
    });

    return products;
  }

  async updateProduct({ id, name, price, category, description }: IUpdateProduct): Promise<Product> {
    await this.repository
      .createQueryBuilder()
      .update(Product)
      .set({ name: name, price: price, category: category, description: description })
      .where("id = :id", { id: id })
      .execute();

    const product = await this.repository.findOne({ id });

    return product;
  }

  async deleteProduct(id: string): Promise<void> {
    await this.repository.softDelete({ id });
  }
}

export { ProductsRepository };