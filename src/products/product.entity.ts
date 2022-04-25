import { SaleEntity } from 'src/sales/sale.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  synchronize: true,
  schema: 'sales',
})
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  title: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  author: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  genre: string;

  @Column({
    precision: 13,
    scale: 6,
    type: 'decimal',
    nullable: false,
    name: 'price',
  })
  price: number;

  @OneToOne(() => SaleEntity, (sale) => sale.client, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  sale: SaleEntity;

  @Column({
    name: 'is_deleted',
    default: () => false,
  })
  isDeleted: boolean;
}
