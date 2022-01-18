import { container } from "tsyringe";
import { ClientsRepository } from "../../modules/_clients/repositories/ClientsRepository";
import { IClientsRepository } from "../../modules/_clients/repositories/IClientsRepository";
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


