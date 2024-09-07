import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/request/create-product.dto';
import { Product } from './products.entity';
import { FilterProductDto } from './dto/request/filter-product.dto';
import { UpdateProductDto } from './dto/request/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { FindBySlugDto } from './dto/request/find-by-slug.dto';
import { AddTagsToProductDto } from './dto/request/add-tags-to-product.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post() create(
    @Body(ValidationPipe) createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Post(':id/tags')
  addTagToProduct(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(ValidationPipe) { categoryTagCategoryIds }: AddTagsToProductDto,
  ) {
    this.productService.addTagsToProduct(id, categoryTagCategoryIds);
  }

  @Get('/search')
  findOneBySlug(@Query(ValidationPipe) findBySlugDto: FindBySlugDto) {
    return this.productService.findByIdOrSlug({ slug: findBySlugDto.slug });
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findByIdOrSlug({ id });
  }

  @Get()
  find(@Query() filterProductDto: FilterProductDto): Promise<Product[]> {
    console.log(filterProductDto);
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
