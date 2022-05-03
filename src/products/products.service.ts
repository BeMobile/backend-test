import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './product.entity';
import { ProductRepository } from './products.repository';
import { GetProductResponse } from './responses/get-product.response';
import { ProductDetailResponse } from './responses/product-detail.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    return await this.productRepository.createProduct(createProductDto);
  }

  async getProducts(): Promise<GetProductResponse> {
    const entityManager = getManager();
    const query = `
    SELECT
      product_entity.id,
      product_entity.title,
      product_entity.price
    FROM sales.product_entity
    WHERE product_entity.is_deleted = 0
    ORDER BY product_entity.title ASC
    `;
    return await entityManager.query(query);
  }

  async getProductDetail(id: string): Promise<ProductDetailResponse> {
    const entityManager = getManager();
    const query = `
    SELECT *
    FROM sales.product_entity
    WHERE product_entity.id = '${id}'
    `;
    return await entityManager.query(query);
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    return await this.productRepository.updateProduct(id, updateProductDto);
  }

  async deleteProduct(id: string) {
    return await this.productRepository.deleteProduct(id);
  }
}
