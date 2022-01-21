import { Sales } from "../entities/Sales";

interface ICreateSalesDTO {
  id_client: string;
  id_product: string;
  quantity: number;
  total_price: number
}

interface ISalesRepository {
  create({id_client, id_product, quantity, total_price}: ICreateSalesDTO): Promise<void>
  listDetails(id: string): Promise<Sales>
}

export { ICreateSalesDTO, ISalesRepository }