import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductType } from './product-type.entity';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { ProductTypesService } from './product-types.service';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';

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
  getProductTypeById(@Param('id') id: string): Promise<ProductType> {
    return this.productTypesService.findOneById(id);
  }

  @Delete(':id')
  deleteProductTypeById(@Param('id') id: string) {
    return this.productTypesService.deleteById(id);
  }

  @Delete()
  deleteManyProductTypeByIds(@Body('ids') ids: string[]) {
    return this.productTypesService.deleteManyByIds(ids);
  }

  @Patch(':id')
  updateById(
    @Param('id') id: string,
    @Body() updateProductTypeDto: UpdateProductTypeDto,
  ) {
    updateProductTypeDto.id = id;
    return this.productTypesService.updateById(updateProductTypeDto);
  }
}
