import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, getManager, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './product.entity';

@EntityRepository(ProductEntity)
export class ProductRepository extends Repository<ProductEntity> {
  async createProduct(createProductDto: CreateProductDto): Promise<any> {
    const { title, author, genre, price } = createProductDto;

    const entityManager = getManager();
    const queryRunner = entityManager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const product = queryRunner.manager.create(ProductEntity, {
        title: title,
        author: author,
        genre: genre,
        price: price,
      });

      await queryRunner.manager.save(product);
      await queryRunner.commitTransaction();
      await queryRunner.release();

      return { id: product.id };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.throwValidError(error);
    }
  }

  async details(id: string): Promise<any> {
    return await this.findOne({
      where: [{ id: id }],
    });
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<any> {
    const entityManager = getManager();
    const queryRunner = entityManager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const product = await queryRunner.manager.findOne(ProductEntity, {
        where: {
          id: id,
        },
      });

      const { title, author, genre, price } = updateProductDto;

      product.title = title ? title : product.title;
      product.author = author ? author : product.author;
      product.genre = genre ? genre : product.genre;
      product.price = price ? price : product.price;

      await product.save();

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return { id: product.id };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.throwValidError(error);
    }
  }

  async deleteProduct(id: string) {
    const entityManager = getManager();
    const queryRunner = entityManager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.update(
        ProductEntity,
        { id: id },
        { isDeleted: true },
      );
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return { message: 'Produto excluido com sucesso!' };
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
