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
import { TagCategoriesService } from './tag-categories.service';
import { CreateTagCategoryDto } from './dto/request/create-tag-category.dto';
import { UpdateTagCategoryDto } from './dto/request/update-tag-category.dto';
import { ApiTags } from '@nestjs/swagger';
import { AddTagCategoryToCategoryDto } from 'src/categories/dto/request/add-tag-category-to-category.dto';
import { AddTagToTagCategoryDto } from './dto/request/add-tag-to-tag-category.dto';

@ApiTags('tag-categories')
@Controller('tag-categories')
export class TagCategoriesController {
  constructor(private tagCategoriesService: TagCategoriesService) {}

  @Post()
  createTagCategory(
    @Body(ValidationPipe) createTagCategoryDto: CreateTagCategoryDto,
  ) {
    return this.tagCategoriesService.createTagCategory(createTagCategoryDto);
  }

  @Get()
  findAllTagCategory() {
    return this.tagCategoriesService.findAllTagCategory();
  }

  @Delete(':id')
  deleteTagCategory(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.tagCategoriesService.deleteTagCategory(id);
  }

  @Patch(':id')
  updateTagCategory(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(ValidationPipe) updateTagCategoryDto: UpdateTagCategoryDto,
  ) {
    return this.tagCategoriesService.updateTagCategory(
      id,
      updateTagCategoryDto,
    );
  }

  @Post(':categoryTagCategoryId/tags/:tagId')
  addTagToTagCategory(
    @Param(ValidationPipe) addTagToTagCategoryDto: AddTagToTagCategoryDto,
  ) {
    return this.tagCategoriesService.addTagToTagCategory(
      addTagToTagCategoryDto,
    );
  }

  @Delete(':categoryTagCategoryId/tags/:tagId')
  deleteTagFromTagCategory(@Param(ValidationPipe) deleteTagFromTagCategoryDto) {
    return this.tagCategoriesService.deleteTagFromTagCategory(
      deleteTagFromTagCategoryDto,
    );
  }

  @Get(':categoryTagCategoryId/tags')
  findAllTagFromCategory(
    @Param('categoryTagCategoryId', new ParseUUIDPipe({ version: '4' }))
    id: string,
  ) {
    return this.tagCategoriesService.findAllTagFromTagCategory(id);
  }
}
