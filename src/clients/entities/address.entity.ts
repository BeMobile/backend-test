import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ClientEntity } from './client.entity';

@Entity({
  synchronize: true,
  schema: 'sales',
})
export class AddressEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

  @Column({
    length: 10,
    nullable: false,
    name: 'cep',
  })
  cep: string;

  @Column({
    length: 255,
    nullable: false,
    name: 'street',
  })
  street: string;

  @Column({
    nullable: false,
    name: 'number',
  })
  number: number;

  @Column({
    length: 50,
    nullable: true,
    name: 'complement',
  })
  complement: string;

  @Column({
    length: 100,
    nullable: false,
    name: 'neighborhood',
  })
  neighborhood: string;

  @Column({
    length: 100,
    nullable: false,
    name: 'city',
  })
  city: string;

  @Column({
    length: 100,
    nullable: false,
    name: 'state',
  })
  state: string;

  @Column({
    length: 255,
    nullable: true,
    name: 'country',
  })
  country: string;

  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'ON UPDATE CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToOne(() => ClientEntity, (client) => client.address, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  client: ClientEntity;
}
