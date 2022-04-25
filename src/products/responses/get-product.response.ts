import { ApiProperty } from '@nestjs/swagger';

export class GetProductResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  price: string;
}
