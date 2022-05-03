import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ClientEntity } from './client.entity';

@Entity({
  synchronize: true,
  schema: 'sales',
})
export class PhoneEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

  @Column({
    length: 255,
    nullable: false,
    name: 'phone_number',
  })
  phoneNumber: string;

  @Column({
    length: 255,
    nullable: true,
    name: 'second_phone',
  })
  secondPhone: string;

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

  @OneToOne(() => ClientEntity, (client) => client.phone, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  client: ClientEntity;
}
