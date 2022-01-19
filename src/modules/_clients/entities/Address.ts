import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Clients } from "./Clients";

@Entity("address")
class Address {

  @ManyToOne(() => Clients)
  @JoinColumn({ name: "client_id" })
  clients: Clients;

  @PrimaryColumn()
  client_id: string;

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
}

export { Address }