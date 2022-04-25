import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from '../auth/dto/credentials.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateUserAdminDto } from 'src/users/dto/create-user-admin.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Cadastro de usuário administrador' })
  @ApiCreatedResponse({ description: 'Cadastro realizado com sucesso' })
  async signup(
    @Body(ValidationPipe) createUserAdminDto: CreateUserAdminDto,
  ): Promise<any> {
    return await this.authService.signup(createUserAdminDto);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Faz login de usuário' })
  @ApiOkResponse({ description: 'Login realizado com sucesso' })
  @ApiUnauthorizedResponse({ description: 'Credenciais inválidas' })
  async login(
    @Body(ValidationPipe) credentialsDto: CredentialsDto,
  ): Promise<{ token: string }> {
    return await this.authService.login(credentialsDto);
  }
}
