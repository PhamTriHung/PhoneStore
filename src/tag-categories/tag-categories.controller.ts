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
import { CreateTagCategoryDto } from './dto/create-tag.dto';
import { UpdateTagCategoryDto } from './dto/udpate-tag.dto';

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
    updateTagCategoryDto.id = id;
    return this.tagCategoriesService.updateTagCategory(updateTagCategoryDto);
  }
}
