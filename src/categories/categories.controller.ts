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
import { CategoriesService } from './categories.service';
import { UpdateResult } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/request/create-category.dto';
import { DeleteManyCategoryDto } from './dto/request/delete-category.dto';
import { UpdateCategoryDto } from './dto/request/update-product-type.dto';
import { ApiTags } from '@nestjs/swagger';
import { CategoryDto } from './dto/response/category.dto';
import { FindCategoryDto } from './dto/request/find-category.dto';

@ApiTags('categories')
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

  @Get('search')
  findCategoryBySlug(
    @Query(ValidationPipe) findCategoryQuery: FindCategoryDto,
  ) {
    return this.categoriesService.findOneBySlug(findCategoryQuery.slug);
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
    return this.categoriesService.updateById(id, updateCategoryDto);
  }
}
