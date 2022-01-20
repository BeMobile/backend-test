import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Product {

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  category: string;

  @Column()
  description: string;

  @DeleteDateColumn()
  deleted: Date;

  @CreateDateColumn()
  created_at: Date;
}

export { Product };