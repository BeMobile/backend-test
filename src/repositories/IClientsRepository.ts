import { Client } from "../models/Client";

export interface ICreateClient {
  id?: string;
  name: string;
  phone: number;
  cpf: number;
  email: string;
  address: string;
  city: string;
}

export interface IUpdateClient {
  id: string;
  name?: string;
  phone?: number;
  email?: string;
  address?: string;
  city?: string;
}

interface IClientsRepository {
  create(data: ICreateClient): Promise<Client>;
  findByEmail(email:string): Promise<Client>;
  findById(id: string): Promise<Client>; 
  findByCPF(cpf: number): Promise<Client>;
  listClients(): Promise<Client[]>;
  updateClient({ id, name, phone, email, address, city }: IUpdateClient): Promise<Client>;
  deleteClient(id: string): Promise<void>;
}

export { IClientsRepository };