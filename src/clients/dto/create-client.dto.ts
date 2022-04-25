import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsPhoneNumber,
  IsEmail,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';
import { UserEntity } from 'src/users/user.entity';
import { AddressEntity } from '../entities/address.entity';
import { PhoneEntity } from '../entities/phone.entity';
export class CreateClientDto {
  @IsString()
  @IsNotEmpty({ message: 'Informe um endereço de e-mail' })
  @IsEmail({}, { message: 'Informe um e-mail válido' })
  @MaxLength(200, { message: 'O e-mail deve ter menos de 200 caracteres' })
  @ApiProperty({ description: 'E-mail do usuário' })
  email: string;

  @IsNotEmpty({ message: 'Informe uma senha' })
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
  @MaxLength(32, { message: 'A senha deve ter no máximo 32 caracteres' })
  @IsString({ message: 'Informe uma senha válida' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
  })
  @ApiProperty({
    description:
      'Senha do usuário. Deve ter no mínimo 8 e no máximo 32 caracteres, deve conter letras maiúsculas, minúsculas, número e caracteres especiais',
  })
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  legalId: string;

  @ApiProperty()
  @IsPhoneNumber('BR')
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty()
  @IsPhoneNumber('BR')
  @IsOptional()
  secondPhone?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cep: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  number: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  complement?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  country: string;

  @IsOptional()
  address: AddressEntity;

  @IsOptional()
  phone: PhoneEntity;

  @IsOptional()
  user: UserEntity;
}
