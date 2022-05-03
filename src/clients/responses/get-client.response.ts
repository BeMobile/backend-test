import { ApiProperty } from '@nestjs/swagger';

export class GetClientResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;
}
