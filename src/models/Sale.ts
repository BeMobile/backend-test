import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./Client";
import { Product } from "./Product";

@Entity()
class Sale {
  
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  quantity: number;

  @Column()
  total_price: number;

  @ManyToOne(() => Client)
  @JoinColumn({ name: "client_id" })
  client: Client;

  @Column()
  client_id: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @Column()
  product_id: string;

  @CreateDateColumn()
  created_at: Date;
}

export { Sale };