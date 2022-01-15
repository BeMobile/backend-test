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

class ClientsRepository {
  private clients: Clients[];

  constructor() {
    this.clients = [];
  }

  create({ nome, cpf, andress: { street,number, district, city, cep } }: ICreateClientDTO): void {
    const createClient = new Clients();
    Object.assign(createClient, {
      nome,
      cpf,
      andress: { 
        street, 
        number, 
        district, 
        city, 
        cep}
        ,
      created_at: new Date()
    });
    this.clients.push(createClient)
  }

  list(): Clients[] {
    return this.clients
  }

  findByCpf(cpf: string): Clients{
    const findCpf = this.clients.find((fcpf) => fcpf.cpf === cpf)
    return findCpf
  }
}

export { ClientsRepository }