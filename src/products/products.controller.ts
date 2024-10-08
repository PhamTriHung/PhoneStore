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
import { ProductDto } from './dto/response/product.dto';
import { AddVariantToProductDto } from './dto/request/add-variant-to-product.dto';
import { AddReviewToProductDto } from './dto/request/add-review-to-product.dto';
import { AddTagToProductDto } from './dto/request/add-tag-to-product.dto';
import { AddAttributeToProductDto } from './dto/request/add-attribute-to-product.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post()
  create(
    @Body(ValidationPipe) createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Post(':id/variants')
  addVariantToProduct(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(ValidationPipe) addVariantToProductDto: AddVariantToProductDto,
  ) {
    return this.productService.addVariantToProduct(id, addVariantToProductDto);
  }

  @Get('/search')
  findOneBySlug(@Query(ValidationPipe) findBySlugDto: FindBySlugDto) {
    return this.productService.findByIdOrSlug({ slug: findBySlugDto.slug });
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProductDto> {
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

  @Post(':productId/reviews')
  addReviewToProduct(
    @Param('productId', new ParseUUIDPipe({ version: '4' })) productId: string,
    @Body(ValidationPipe) addReviewToProductDto: AddReviewToProductDto,
  ) {
    return this.productService.addReviewToProduct(
      productId,
      addReviewToProductDto,
    );
  }

  @Post(':productId/tags')
  addTagToProduct(
    @Param('productId', new ParseUUIDPipe({ version: '4' })) productId: string,
    @Body('categoryTagCategoryTagId', new ParseUUIDPipe({ version: '4' }))
    categoryTagCategoryTagId: string,
  ) {
    return this.productService.addTagToProduct(
      categoryTagCategoryTagId,
      productId,
    );
  }

  @Post(':productId/attributes')
  addAttributeToProduct(
    @Param('productId', new ParseUUIDPipe({ version: '4' })) productId: string,
    @Body(ValidationPipe) addAttributeToProductDto: AddAttributeToProductDto,
  ) {
    return this.productService.addAttributeToProduct(
      productId,
      addAttributeToProductDto,
    );
  }
}
