import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleRepository } from './sales.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SaleRepository])],
  providers: [SalesService],
  controllers: [SalesController],
})
export class SalesModule {}
