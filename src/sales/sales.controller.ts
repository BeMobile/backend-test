import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateSaleDto } from './dto/create-sale.dto';
import { SaleEntity } from './sale.entity';
import { SalesService } from './sales.service';

@ApiTags('Sales')
@Controller('sales')
export class SalesController {
  constructor(private salesService: SalesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/store')
  @ApiOperation({ summary: 'Cadastro de venda' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiCreatedResponse({ description: 'Venda realizada com sucesso' })
  async createClient(
    @Body(ValidationPipe) createSaleDto: CreateSaleDto,
  ): Promise<SaleEntity> {
    return await this.salesService.createSale(createSaleDto);
  }
}
