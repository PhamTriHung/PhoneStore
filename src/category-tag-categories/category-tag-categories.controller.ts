import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CategoryTagCategoriesService } from './category-tag-categories.service';
import { CreateCategoryTagLinkDto } from './dto/request/create-category-tag-link.dto';

@Controller('category-tag-categories')
export class CategoryTagCategoriesController {
  constructor(
    private categoryTagCategoriesService: CategoryTagCategoriesService,
  ) {}

  @Post()
  createCategoryTagLink(
    @Body(ValidationPipe) createCategoryTagLinkDto: CreateCategoryTagLinkDto,
  ) {
    return this.categoryTagCategoriesService.createCategoryTagLink(
      createCategoryTagLinkDto,
    );
  }
}
