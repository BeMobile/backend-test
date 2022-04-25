import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { EntityRepository, getManager, Repository } from 'typeorm';
import { CreateSaleDto } from './dto/create-sale.dto';
import { SaleEntity } from './sale.entity';
import { ClientEntity } from 'src/clients/entities/client.entity';

@EntityRepository(SaleEntity)
export class SaleRepository extends Repository<SaleEntity> {
  async createSale(createSaleDto: CreateSaleDto): Promise<any> {
    const { product, client } = createSaleDto;

    const entityManager = getManager();
    const queryRunner = entityManager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const sale = await queryRunner.manager.save(SaleEntity, {
        id: uuidv4(),
        product: product,
        client: client,
      });

      await queryRunner.manager.update(
        ClientEntity,
        { id: client },
        { sales: sale.id },
      );

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return { id: sale.id };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.throwValidError(error);
    }
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
