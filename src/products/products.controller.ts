import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './products.entity';
import { DeleteResult } from 'typeorm';
import { FilterProductDto } from './dto/filter-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post()
  create(
    @Body(ValidationPipe) createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findById(id);
  }

  @Get()
  find(@Query() filterProductDto: FilterProductDto): Promise<Product[]> {
    return this.productService.find(filterProductDto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string): Promise<DeleteResult> {
    return this.productService.deleteById(id);
  }

  @Delete()
  deleteMany(@Body('ids') ids: string[]): Promise<DeleteResult> {
    return this.productService.deleteManyByIds(ids);
  }
}
