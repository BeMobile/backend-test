import { Clients } from "../model/Clients";
import { IClientsRepository, ICreateClientDTO } from "./IClientsRepository";

class ClientsRepository implements IClientsRepository {
  private clients: Clients[];

  private static INSTANCE: ClientsRepository

  private constructor() {
    this.clients = [];
  }

  public static getInstance(): ClientsRepository {
    if(!ClientsRepository.INSTANCE) {
      ClientsRepository.INSTANCE = new ClientsRepository();
    }
    return ClientsRepository.INSTANCE;
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