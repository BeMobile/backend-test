import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOperation,
  ApiOkResponse,
  ApiResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ClientsService } from './clients.service';
import { ClientEntity } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { GetClientResponse } from './responses/get-client.response';
import { GetClientByIdResponse } from './responses/get-client-by-id.response';
import { UpdateClientDto } from './dto/update-client.dto';

@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/index')
  @ApiOperation({ summary: 'Listagem de todos os clientes' })
  @ApiOkResponse({ type: GetClientResponse })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getClients(): Promise<GetClientResponse> {
    return await this.clientsService.getClients();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/show')
  @ApiOperation({ summary: 'Listagem de um cliente' })
  @ApiOkResponse({ type: GetClientByIdResponse })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findSalesByClient(
    @Query('id') id: string,
  ): Promise<GetClientByIdResponse> {
    return await this.clientsService.findSalesByClient(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/store')
  @ApiOperation({ summary: 'Cadastro de cliente' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiCreatedResponse({ description: 'Cadastro realizado com sucesso' })
  async createClient(
    @Body(ValidationPipe) createClientDto: CreateClientDto,
  ): Promise<ClientEntity> {
    return await this.clientsService.createClient(createClientDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/address/:id')
  @ApiOperation({
    summary: 'Busca endereço pertencente a cliente especificado por id',
  })
  @ApiOkResponse({ description: 'Sucesso' })
  @ApiNotFoundResponse({ description: 'Cliente não possui endereço' })
  async findAddressByUser(@Param('id') id: string) {
    return await this.clientsService.findAddressByClient(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/phone/:id')
  @ApiOperation({
    summary: 'Busca telefone pertencente a cliente especificado por id',
  })
  @ApiOkResponse({ description: 'Sucesso' })
  @ApiNotFoundResponse({ description: 'Cliente não possui telefone' })
  async findPhoneByUser(@Param('id') id: string) {
    return await this.clientsService.findPhoneByClient(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update/:id')
  @ApiOperation({ summary: 'Aplica alterações nos dados do cliente' })
  @ApiOkResponse({ description: 'Cliente atualizado com sucesso!' })
  async updateClient(
    @Body(ValidationPipe) updateClientDto: UpdateClientDto,
    @Param('id') id: string,
  ) {
    return this.clientsService.updateClient(id, updateClientDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Exclui um cliente e a venda associada a ele' })
  @ApiOkResponse({ description: 'Cliente excluido com sucesso!' })
  async deleteClient(@Param('id') id: string) {
    return this.clientsService.deleteClient(id);
  }
}
