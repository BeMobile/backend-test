import { ApiProperty } from '@nestjs/swagger';

export class GetClientByIdResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  sales: JSON;
}
