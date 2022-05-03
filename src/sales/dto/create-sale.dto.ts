import { ApiProperty } from '@nestjs/swagger';
import { ClientEntity } from 'src/clients/entities/client.entity';
import { ProductEntity } from 'src/products/product.entity';

export class CreateSaleDto {
  @ApiProperty()
  product: ProductEntity;

  @ApiProperty()
  client: ClientEntity;
}
