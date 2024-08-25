import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ProductStoreService } from './product-store.service';
import { CreateProductStoreDto } from './dto/create-product-store.dto';
import { ProductStore } from './product-store.entity';
import { UpdateResult } from 'typeorm';
import { UpdateProductStoreDto } from './dto/update-product-store.dto';
import { DeleteProductStoreDto } from './dto/delete-product-store.dto';

@Controller('product-stores')
export class ProductStoreController {
  constructor(private productStoreService: ProductStoreService) {}

  @Post()
  addProductStore(
    @Body(ValidationPipe) createProductStoreDto: CreateProductStoreDto,
  ): Promise<ProductStore> {
    return this.productStoreService.create(createProductStoreDto);
  }

  @Get()
  listAllProductStore(): Promise<ProductStore[]> {
    return this.productStoreService.find();
  }

  @Patch()
  updateProductStore(
    @Body(ValidationPipe) updateProductStoreDto: UpdateProductStoreDto,
  ): Promise<UpdateResult> {
    return this.productStoreService.update(updateProductStoreDto);
  }

  @Delete()
  deleteProductStore(
    @Body(ValidationPipe) deleteProductStoreDto: DeleteProductStoreDto,
  ) {
    return this.productStoreService.delete(deleteProductStoreDto);
  }
}
