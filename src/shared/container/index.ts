import { container } from "tsyringe";
import { AddressRepository } from "../../modules/_clients/repositories/AddressRepository";
import { ClientsRepository } from "../../modules/_clients/repositories/ClientsRepository";
import { IAddressRepository } from "../../modules/_clients/repositories/IAddressRepository";
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

container.registerSingleton<IAddressRepository>(
  "AddressRepository",
  AddressRepository
);

