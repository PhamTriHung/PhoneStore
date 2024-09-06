import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './products.entity';
import { UpdateResult } from 'typeorm';
import { FilterProductDto } from './dto/filter-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post() create(
    @Body(ValidationPipe) createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Get(':id') findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findById(id);
  }

  @Get()
  find(@Query() filterProductDto: FilterProductDto): Promise<Product[]> {
    return this.productService.find(filterProductDto);
  }

  @Patch(':id')
  updateProductById(
    @Param('id') id: string,
    @Body(ValidationPipe) updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.updateProductById(id, updateProductDto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string): Promise<Product> {
    return this.productService.deleteById(id);
  }

  @Delete()
  deleteMany(@Body('ids') ids: string[]): Promise<Product[]> {
    return this.productService.deleteManyByIds(ids);
  }
}
