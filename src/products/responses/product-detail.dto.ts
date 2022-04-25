import { ApiProperty } from '@nestjs/swagger';

export class ProductDetailResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  genre: string;

  @ApiProperty()
  price: string;
}
