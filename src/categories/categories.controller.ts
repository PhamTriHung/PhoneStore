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
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/request/create-category.dto';
import { DeleteManyCategoryDto } from './dto/request/delete-category.dto';
import { UpdateCategoryDto } from './dto/request/update-product-type.dto';
import { ApiTags } from '@nestjs/swagger';
import { FindCategoryDto } from './dto/request/find-category.dto';
import { AddTagCategoryToCategoryDto } from './dto/request/add-tag-category-to-category.dto';
import { DeleteTagCategoryFromCategoryDto } from './dto/request/delete-tag-category-from-category.dto';
import { DeleteProductFromCategoryDto } from './dto/request/delete-product-from-category.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  createProductType(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Get()
  getAllProductType(): Promise<Category[]> {
    return this.categoriesService.findAllCategory();
  }

  @Get('search')
  findCategoryBySlug(
    @Query(ValidationPipe) findCategoryQuery: FindCategoryDto,
  ) {
    return this.categoriesService.findOneCategoryBySlug(findCategoryQuery.slug);
  }

  @Get(':id')
  getProductTypeById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Category> {
    return this.categoriesService.findOneCategoryById(id);
  }

  @Delete(':id')
  deleteProductTypeById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Category> {
    return this.categoriesService.deleteCategoryById(id);
  }

  @Delete()
  deleteManyProductTypeByIds(
    @Body(ValidationPipe) deleteManyCategoryDto: DeleteManyCategoryDto,
  ): Promise<Category[]> {
    return this.categoriesService.deleteMultipleCategoryByIds(
      deleteManyCategoryDto.ids,
    );
  }

  @Patch(':id')
  updateById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(ValidationPipe) updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.updateCategoryById(id, updateCategoryDto);
  }

  @Post(':id/tag-categories/:tagCategoryId')
  addTagCategoryToCategory(
    @Param(ValidationPipe)
    addTagCategoryToCategoryDto: AddTagCategoryToCategoryDto,
  ) {
    return this.categoriesService.addTagCategoryToCategory(
      addTagCategoryToCategoryDto,
    );
  }

  @Get(':id/tag-categories/')
  findAllTagCategoryByCategoryId(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.categoriesService.findAllTagCategoryByCategoryId(id);
  }

  @Delete(':id/tag-categories/:tagCagetoryId')
  deleteTagCategoryFromCategoryById(
    @Param(ValidationPipe)
    deleteTagCategoryFromCategoryDto: DeleteTagCategoryFromCategoryDto,
  ) {
    return this.categoriesService.deleteTagCategoryFromCategoryById(
      deleteTagCategoryFromCategoryDto,
    );
  }

  @Post(':id/products')
  addProductToCategory(
    @Param('id', new ParseUUIDPipe({ version: '4' })) categoryId: string,
    @Body('productId', new ParseUUIDPipe({ version: '4' })) productId: string,
  ) {
    return this.categoriesService.addProductToCategory({
      productId,
      categoryId,
    });
  }

  @Delete(':categoryId/products/:productId')
  deleteProductFromCategory(
    @Param(ValidationPipe)
    deleteProductFromCategoryDto: DeleteProductFromCategoryDto,
  ) {
    return this.categoriesService.deleteProductFromCategory(
      deleteProductFromCategoryDto,
    );
  }
}
