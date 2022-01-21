import { Clients } from "../entities/Clients";

interface ICreateClientDTO {
  nome: string;
  cpf?: string;
  telefone: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  cep: string;
}

interface IUpdateClientDTO {
  id?: string;
  nome?: string;
  telefone?: string;
  rua?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  cep?: string;
}

interface IClientsRepository {
  findByCpf(cpf: string): Promise<Clients>;
  findById(id: string): Promise<Clients>;
  create({ nome, cpf, telefone, rua, numero, bairro, cidade, cep}: ICreateClientDTO): Promise<void>;
  list(): Promise<Clients[]>;
  updateClient({ id, nome, telefone, rua, numero, bairro, cidade, cep}: IUpdateClientDTO): Promise<Clients>; 
  deleteClient(id: string): Promise<void>;
}

export { ICreateClientDTO, IClientsRepository, IUpdateClientDTO }