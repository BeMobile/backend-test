import {v4 as uuidV4} from 'uuid'

class Clients {
  id?: string;
  nome: string;
  cpf: string;
  andress: {
    street: string;
    number: number;
    district: string;
    city: string;
    cep: string;
  }
  created_at: Date;

  constructor() {
    if(!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Clients }