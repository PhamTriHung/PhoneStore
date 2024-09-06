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
import { UpdateTagCategoryDto } from './dto/request/udpate-tag.dto';
import { ApiTags } from '@nestjs/swagger';

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
}
