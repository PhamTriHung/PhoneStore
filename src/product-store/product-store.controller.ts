import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
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
import { ApiTags } from '@nestjs/swagger';
import { DeleteMultipleProductStoreDto } from './dto/delete-multiple-product-store.dto';

@ApiTags('product-stores')
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

  @Patch(':id')
  updateProductStore(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(ValidationPipe)
    updateProductStoreDto: UpdateProductStoreDto,
  ): Promise<UpdateResult> {
    return this.productStoreService.update(id, updateProductStoreDto);
  }

  @Delete(':id')
  deleteProductStore(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.productStoreService.delete(id);
  }

  @Delete()
  deleteMultipleProductStore(
    @Body(ValidationPipe)
    deleteMultipleProductStoreDto: DeleteMultipleProductStoreDto,
  ) {
    return this.productStoreService.deleteMultipleByIds(
      deleteMultipleProductStoreDto.ids,
    );
  }
}
