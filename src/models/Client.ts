import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Client {

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  phone: number;

  @Column()
  cpf: number;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @CreateDateColumn()
  created_at: Date;
}

export { Client };