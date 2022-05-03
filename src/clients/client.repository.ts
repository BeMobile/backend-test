import { EntityRepository, getManager, Repository } from 'typeorm';
import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { CreateClientDto } from './dto/create-client.dto';
import { AddressEntity } from './entities/address.entity';
import { PhoneEntity } from './entities/phone.entity';
import { UserEntity } from 'src/users/user.entity';
import { ClientEntity } from './entities/client.entity';
import { UpdateClientDto } from './dto/update-client.dto';

@EntityRepository(ClientEntity)
export class ClientRepository extends Repository<ClientEntity> {
  async createClient(createClientDto: CreateClientDto): Promise<any> {
    const entityManager = getManager();
    const queryRunner = entityManager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      createClientDto.phoneNumber = createClientDto.phoneNumber.replace(
        /\D/g,
        '',
      );
      createClientDto.secondPhone = createClientDto.secondPhone
        ? createClientDto.secondPhone.replace(/\D/g, '')
        : null;

      const address = await queryRunner.manager.save(AddressEntity, {
        id: uuidv4(),
        cep: createClientDto.cep,
        street: createClientDto.street,
        number: createClientDto.number,
        complement: createClientDto.complement,
        neighborhood: createClientDto.neighborhood,
        city: createClientDto.city,
        state: createClientDto.state,
        country: createClientDto.country,
      });

      const phone = await queryRunner.manager.save(PhoneEntity, {
        id: uuidv4(),
        phoneNumber: createClientDto.phoneNumber,
        secondPhone: createClientDto.secondPhone,
      });

      const { legalId, email, password } = createClientDto;
      const status = true;
      const salt = await bcrypt.genSalt();
      const hash = await this.hashPassword(password, salt);

      const user = await queryRunner.manager.save(UserEntity, {
        id: uuidv4(),
        email: email,
        status: status,
        salt: salt,
        password: hash,
      });

      const client = await queryRunner.manager.save(ClientEntity, {
        id: uuidv4(),
        name: createClientDto.name,
        legalId: legalId.replace(/\D/g, ''),
        address: address.id,
        phone: phone.id,
        user: user.id,
        sales: null,
      });

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return { id: client.id };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.throwValidError(error);
    }
  }

  async findSalesByClient(id: string): Promise<any> {
    const entityManager = getManager();
    const queryRunner = entityManager.connection.createQueryRunner();
    const sales = await queryRunner.manager.findOne(ClientEntity, {
      select: ['id', 'name'],
      where: {
        id: id,
      },
      relations: ['sales'],
    });

    return sales;
  }

  async findAddressByClient(id: string): Promise<any> {
    const entityManager = getManager();
    const queryRunner = entityManager.connection.createQueryRunner();
    const address = await queryRunner.manager.findOne(ClientEntity, {
      select: ['id', 'name'],
      where: {
        id: id,
      },
      relations: ['address'],
    });

    return address;
  }

  async findPhoneByClient(id: string): Promise<any> {
    const entityManager = getManager();
    const queryRunner = entityManager.connection.createQueryRunner();
    const phone = await queryRunner.manager.findOne(ClientEntity, {
      select: ['id', 'name'],
      where: {
        id: id,
      },
      relations: ['phone'],
    });

    return phone;
  }

  async updateClient(
    id: string,
    updateClientDto: UpdateClientDto,
  ): Promise<any> {
    const entityManager = getManager();
    const queryRunner = entityManager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const client = await queryRunner.manager.findOne(ClientEntity, {
        where: {
          id: id,
        },
      });

      const { name, legalId } = updateClientDto;

      client.name = name ? name : client.name;
      client.legalId = legalId ? legalId : client.legalId;
      await client.save();

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return { id: client.id };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.throwValidError(error);
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
