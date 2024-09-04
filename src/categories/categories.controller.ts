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
import { CategoriesService } from './categories.service';
import { UpdateResult } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { DeleteManyCategoryDto } from './dto/delete-category.dto';
import { UpdateCategoryDto } from './dto/update-product-type.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  createProductType(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  getAllProductType(): Promise<Category[]> {
    return this.categoriesService.find();
  }

  @Get(':id')
  getProductTypeById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Category> {
    return this.categoriesService.findOneById(id);
  }

  @Delete(':id')
  deleteProductTypeById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Category> {
    return this.categoriesService.deleteById(id);
  }

  @Delete()
  deleteManyProductTypeByIds(
    @Body(ValidationPipe) deleteManyCategoryDto: DeleteManyCategoryDto,
  ): Promise<Category[]> {
    return this.categoriesService.deleteManyByIds(deleteManyCategoryDto.ids);
  }

  @Patch(':id')
  updateById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(ValidationPipe) updateCategoryDto: UpdateCategoryDto,
  ) {
    updateCategoryDto.id = id;
    return this.categoriesService.updateById(updateCategoryDto);
  }
}
