import { EntityRepository, getManager, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { CredentialsDto } from '../auth/dto/credentials.dto';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserAdminDto } from './dto/create-user-admin.dto';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const { email, password, client } = createUserDto;
    const status = true;
    const salt = await bcrypt.genSalt();
    const hash = await this.hashPassword(password, salt);

    const entityManager = getManager();
    const queryRunner = entityManager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const user = queryRunner.manager.create(UserEntity, {
        email: email,
        status: status,
        salt: salt,
        password: hash,
        client: client,
      });

      await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();
      await queryRunner.release();

      return { id: user.id };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.throwValidError(error);
    }
  }

  async createUserAdmin(createUserAdminDto: CreateUserAdminDto): Promise<any> {
    const { email, password } = createUserAdminDto;
    const status = true;
    const salt = await bcrypt.genSalt();
    const hash = await this.hashPassword(password, salt);

    const entityManager = getManager();
    const queryRunner = entityManager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const userAdm = queryRunner.manager.create(UserEntity, {
        email: email,
        status: status,
        salt: salt,
        password: hash,
        client: null,
      });

      await queryRunner.manager.save(userAdm);
      await queryRunner.commitTransaction();
      await queryRunner.release();

      return { id: userAdm.id };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.throwValidError(error);
    }
  }

  async findSalesByUser(id: string): Promise<any> {
    const query = this.createQueryBuilder('user');
    query.where('user.id = :id', { id });
    query.innerJoinAndSelect('user.sales', 'sales');
    query.select(['user.id', 'sales']);
    return await query.getOne();
  }

  async checkCredentials(credentialsDto: CredentialsDto): Promise<UserEntity> {
    const { email, password } = credentialsDto;
    const user = await this.findOne({ email, status: true });
    if (user && (await user.checkPassword(password))) {
      return user;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  private throwValidError(error: HttpException | Error) {
    if (error instanceof HttpException) {
      throw error;
    } else {
      throw new InternalServerErrorException({
        message: error.message,
      });
    }
  }
}
