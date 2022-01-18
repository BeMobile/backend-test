import { Clients } from "../entities/Clients";

interface ICreateClientDTO {
  nome: string;
  cpf: string;
  telefone: string;
  rua: string;
  numero: number;
  bairro: string;
  cidade: string;
  cep: string;
}
interface IClientsRepository {
  findByCpf(cpf: string): Promise<Clients>;
  list(nome: string, cpf: string): Promise<Clients[]>;
  create({ nome, cpf, telefone, rua, numero, bairro, cidade, cep}: ICreateClientDTO): Promise<void>;
}

export { ICreateClientDTO, IClientsRepository }