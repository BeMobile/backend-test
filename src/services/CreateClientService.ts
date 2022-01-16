import { ClientsRepository } from "../modules/_clients/repositories/ClientsRepository"

interface IRequest {
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

class CreateClientService {

  constructor(private clientRepository: ClientsRepository) {

  }
  execute({nome, cpf, andress: {street, number, district, city, cep}}: IRequest) {

    const clientAllreadyExists = this.clientRepository.findByCpf(cpf);

    if(clientAllreadyExists) {
      throw new Error("Client with this CPF allready exists!")
    }
    this.clientRepository.create(
      { 
        nome, 
        cpf, 
        andress: 
        {
          street, 
          number, 
          district, 
          city, 
          cep
        } 
      });
  }
}

export { CreateClientService }