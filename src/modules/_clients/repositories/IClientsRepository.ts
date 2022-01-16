import { Clients } from "../model/Clients";

interface ICreateClientDTO {
  nome: string;
  cpf: string;
  andress: {
    street: string;
    number: number;
    district: string;
    city: string;
    cep: string;
  }
}
interface IClientsRepository {
  findByCpf(cpf: string): Clients;
  list(nome: string, cpf: string): Clients[];
  create({ nome, cpf, andress: { street, number, district, city, cep }
  }: ICreateClientDTO): void;
}

export { ICreateClientDTO, IClientsRepository }