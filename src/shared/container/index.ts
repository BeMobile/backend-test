import { container } from "tsyringe";
import { ClientsRepository } from "../../modules/_clients/repositories/ClientsRepository";
import { IClientsRepository } from "../../modules/_clients/repositories/IClientsRepository";
import { IProductsRepository } from "../../modules/_products/repositories/IProductsRepository";
import { ProductsRepository } from "../../modules/_products/repositories/ProductsRepository";
import { ISalesRepository } from "../../modules/_sales/repositories/ISalesRepository";
import { SalesRepository } from "../../modules/_sales/repositories/SalesRepository";
import { IUsersRepository } from "../../modules/_users/repositories/IUsersRepository";
import { UserRepository } from "../../modules/_users/repositories/UserRepository";

container.registerSingleton<IUsersRepository>(
  "UserRepository",
  UserRepository
);

container.registerSingleton<IClientsRepository>(
  "ClientsRepository",
  ClientsRepository
);

container.registerSingleton<IProductsRepository>(
  "ProductsRepository",
  ProductsRepository
)

container.registerSingleton<ISalesRepository>(
  "SalesRepository",
  SalesRepository
)
