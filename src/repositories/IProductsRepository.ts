import { Product } from "../models/Product";

export interface ICreateProduct {
  id?: string;
  name: string;
  price: number;
  category: string;
  description: string;
}

export interface IUpdateProduct {
  id: string;
  name?: string;
  price?: number;
  category?: string;
  description?: string;
}

interface IProductsRepository {
  create(data: ICreateProduct): Promise<Product>;
  findById(id: string): Promise<Product>;
  findByName(name: string): Promise<Product>;
  listProducts(): Promise<Product[]>;
  updateProduct({ id, name, price, category, description }: IUpdateProduct): Promise<Product>;
  deleteProduct(id: string): Promise<void>;
}

export { IProductsRepository };