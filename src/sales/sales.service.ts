import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSaleDto } from './dto/create-sale.dto';
import { SaleEntity } from './sale.entity';
import { SaleRepository } from './sales.repository';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(SaleRepository)
    private saleRepository: SaleRepository,
  ) {}

  async createSale(createSaleDto: CreateSaleDto): Promise<SaleEntity> {
    return await this.saleRepository.createSale(createSaleDto);
  }
}
