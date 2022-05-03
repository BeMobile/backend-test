import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { UserEntity } from 'src/users/user.entity';
import { AddressEntity } from './address.entity';
import { PhoneEntity } from './phone.entity';
import { SaleEntity } from 'src/sales/sale.entity';

@Entity({
  synchronize: true,
  schema: 'sales',
})
@Unique(['id'])
export class ClientEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;

  @Column({ nullable: false })
  legalId: string;

  @OneToOne(() => UserEntity, (user) => user.client, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
  })
  user: UserEntity;

  @OneToOne(() => AddressEntity, (address) => address.client, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'address_id',
  })
  address: AddressEntity;

  @OneToOne(() => PhoneEntity, (phone) => phone.client, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'phone_id',
  })
  phone: PhoneEntity;

  @OneToOne(() => SaleEntity, (sale) => sale.client, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'sale_id' })
  sales: SaleEntity[];
}
