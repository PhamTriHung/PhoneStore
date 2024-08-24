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
import { ProductType } from './product-type.entity';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { ProductTypesService } from './product-types.service';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { DeleteManyProductTypeDto } from './dto/delete-many-product-types.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('product-types')
export class ProductTypesController {
  constructor(private productTypesService: ProductTypesService) {}

  @Post()
  createProductType(
    @Body() createProductTypeDto: CreateProductTypeDto,
  ): Promise<ProductType> {
    return this.productTypesService.create(createProductTypeDto);
  }

  @Get()
  getAllProductType(): Promise<ProductType[]> {
    return this.productTypesService.find();
  }

  @Get(':id')
  getProductTypeById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ProductType> {
    return this.productTypesService.findOneById(id);
  }

  @Delete(':id')
  deleteProductTypeById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<DeleteResult> {
    return this.productTypesService.deleteById(id);
  }

  @Delete()
  deleteManyProductTypeByIds(
    @Body(ValidationPipe) deleteManyProductTypeDto: DeleteManyProductTypeDto,
  ): Promise<DeleteResult> {
    return this.productTypesService.deleteManyByIds(
      deleteManyProductTypeDto.ids,
    );
  }

  @Patch(':id')
  updateById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(ValidationPipe) updateProductTypeDto: UpdateProductTypeDto,
  ): Promise<UpdateResult> {
    updateProductTypeDto.id = id;
    return this.productTypesService.updateById(updateProductTypeDto);
  }
}
