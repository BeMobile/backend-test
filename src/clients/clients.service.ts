import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from './entities/client.entity';
import { ClientRepository } from './client.repository';
import { CreateClientDto } from './dto/create-client.dto';
import { GetClientResponse } from './responses/get-client.response';
import { getManager } from 'typeorm';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientRepository)
    private clientRepository: ClientRepository,
  ) {}

  async getClients(): Promise<GetClientResponse> {
    const entityManager = getManager();
    const query = `
    SELECT
      client_entity.id,
      client_entity.name,
      user_entity.email,
      phone_entity.phone_number AS phone,
      address_entity.city,
      address_entity.state
    FROM sales.client_entity
    LEFT JOIN sales.user_entity
        ON (client_entity.user_id  = user_entity.id)
    LEFT JOIN sales.address_entity
    ON (client_entity.address_id  = address_entity.id)
    LEFT JOIN sales.phone_entity
    ON (client_entity.phone_id  = phone_entity.id)
    ORDER BY client_entity.id ASC
    `;
    return await entityManager.query(query);
  }

  async findSalesByClient(id: string): Promise<any> {
    const sales = await this.clientRepository.findSalesByClient(id);

    if (!sales) throw new NotFoundException('Cliente não possui compras');

    return sales;
  }

  async findAddressByClient(id: string): Promise<ClientEntity[]> {
    const address = await this.clientRepository.findAddressByClient(id);

    if (!address) throw new NotFoundException('Cliente não possui endereço');

    return address;
  }

  async findPhoneByClient(id: string): Promise<ClientEntity[]> {
    const phone = await this.clientRepository.findPhoneByClient(id);

    if (!phone) throw new NotFoundException('Cliente não possui telefone');

    return phone;
  }

  async createClient(createClientDto: CreateClientDto): Promise<ClientEntity> {
    return await this.clientRepository.createClient(createClientDto);
  }

  async updateClient(
    id: string,
    updateClientDto: UpdateClientDto,
  ): Promise<ClientEntity> {
    return await this.clientRepository.updateClient(id, updateClientDto);
  }

  async deleteClient(id: string) {
    const result = await this.clientRepository.delete({ id: id });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado um cliente com o ID informado',
      );
    }
  }
}
