import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CategoryTagCategoryTagsService } from './category-tag-category-tags.service';
import { CreateCategoryTagCategoryTagDto } from './dto/request/create-category-tag-category-tag.dto';

@Controller('category-tag-category-tags')
export class CategoryTagCategoryTagsController {
  constructor(
    private categoryTagCategoryTagService: CategoryTagCategoryTagsService,
  ) {}

  @Post()
  createCategoryTagCategoryTag(
    @Body(ValidationPipe)
    createCategoryTagCategoryTagDto: CreateCategoryTagCategoryTagDto,
  ) {
    return this.categoryTagCategoryTagService.createCategoryTagCategoryTag(
      createCategoryTagCategoryTagDto,
    );
  }
}
