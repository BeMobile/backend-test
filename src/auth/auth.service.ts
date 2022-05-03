import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/users/users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CredentialsDto } from '../auth/dto/credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateUserAdminDto } from 'src/users/dto/create-user-admin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signup(createUserAdminDto: CreateUserAdminDto): Promise<any> {
    return await this.userRepository.createUserAdmin(createUserAdminDto);
  }

  async login(credentialsDto: CredentialsDto) {
    const user = await this.userRepository.checkCredentials(credentialsDto);
    if (user === null) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const userId = user.id;

    const jwtPayload = {
      id: user.id,
    };
    const token = await this.jwtService.sign(jwtPayload);
    return { token, userId };
  }
}
