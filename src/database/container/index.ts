import { container } from "tsyringe";

import { ClientsRepository } from "../../repositories/ClientsRepository";
import { IClientsRepository } from "../../repositories/IClientsRepository";
import { IProductsRepository } from "../../repositories/IProductsRepository";
import { ISalesRepository } from "../../repositories/ISalesRepository";
import { IUsersRepository } from "../../repositories/IUserRepository";
import { ProductsRepository } from "../../repositories/ProductsRepository";
import { SalesRepository } from "../../repositories/SalesRepository";
import { UsersRepository } from "../../repositories/UsersRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IClientsRepository>(
  "ClientsRepository",
  ClientsRepository
);

container.registerSingleton<IProductsRepository>(
  "ProductsRepository",
  ProductsRepository
);

container.registerSingleton<ISalesRepository>(
  "SalesRepository",
  SalesRepository
);
