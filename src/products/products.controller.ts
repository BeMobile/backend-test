import {
  Body,
  Controller,
  Delete,
  Get,
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
  ApiResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductDetailResponse } from './responses/product-detail.dto';
import { ProductEntity } from './product.entity';
import { ProductsService } from './products.service';
import { GetProductResponse } from './responses/get-product.response';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/index')
  @ApiOperation({ summary: 'Listagem de todos os produtos' })
  @ApiOkResponse({ type: GetProductResponse })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProducts(): Promise<GetProductResponse> {
    return await this.productsService.getProducts();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/show')
  @ApiOperation({ summary: 'Listagem de um produto' })
  @ApiOkResponse({ type: ProductDetailResponse })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProductDetail(
    @Query('id') id: string,
  ): Promise<ProductDetailResponse> {
    return await this.productsService.getProductDetail(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/store')
  @ApiOperation({ summary: 'Cadastro de produto' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiCreatedResponse({ description: 'Produto cadastrado com sucesso' })
  async createProduct(
    @Body(ValidationPipe) createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    return await this.productsService.createProduct(createProductDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update/:id')
  @ApiOperation({ summary: 'Aplica alterações nos dados do produto' })
  @ApiOkResponse({ description: 'Produto atualizado com sucesso!' })
  async updateProduct(
    @Body(ValidationPipe) updateProductDto: UpdateProductDto,
    @Param('id') id: string,
  ) {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  @ApiOperation({ summary: 'Exclui de forma lógica um produto' })
  @ApiOkResponse({ description: 'Produto excluido com sucesso!' })
  async deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
