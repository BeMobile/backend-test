import { ClientEntity } from 'src/clients/entities/client.entity';
import { ProductEntity } from 'src/products/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  synchronize: true,
  schema: 'sales',
})
export class SaleEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

  @OneToOne(() => ProductEntity, (product) => product.sale, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'product_id',
  })
  product: ProductEntity;

  @OneToOne(() => ClientEntity, (clients) => clients.sales, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'client_id',
  })
  client: ClientEntity;

  @Column({
    type: 'timestamp',
    nullable: false,
    name: 'date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: Date;
}
