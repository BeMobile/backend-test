import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  author: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  genre: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  price: number;
}
