import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import {v4 as uuidV4} from 'uuid'
import { Clients } from '../../_clients/entities/Clients';
import { Products } from '../../_products/entities/Products';

@Entity("sales")
class Sales {

  @PrimaryColumn()
  id?: string;

  @ManyToOne(() => Clients)
  @JoinColumn({ name: "id_client"})
  client: Clients;

  @Column()
  id_client: string;

  @ManyToOne(() => Products)
  @JoinColumn({ name: "id_product"})
  product: Products;

  @Column()
  id_product: string;

  @Column()
  quantity: number;

  @Column()
  total_price: number;

  constructor() {
    if(!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Sales }