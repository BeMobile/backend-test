import { Sale } from "../models/Sale";

export interface ICreateSale {
  id?: string;
  quantity: number;
  total_price?: number;
  client_id: string;
  product_id: string;
}

interface ISalesRepository {
  create({
    quantity,
    total_price,
    client_id,
    product_id
  }: ICreateSale): Promise<Sale>;
  findById(id: string): Promise<Sale>;
  findByClient(client_id: string): Promise<Sale[]>;
  deleteSaleByClientId(client_id: string): Promise<void>;
}

export { ISalesRepository };