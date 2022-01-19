import {v4 as uuidV4} from 'uuid'
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"
 
@Entity("clients")
class Clients {

  @PrimaryColumn()
  id?: string;

  @Column()
  nome: string;

  @Column()
  cpf: string;

  @Column()
  telefone: string;

  @Column()
  rua: string;

  @Column()
  numero: string;

  @Column()
  bairro: string;

  @Column()
  cidade: string;

  @Column()
  cep: string;
  
  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if(!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Clients }