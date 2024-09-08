import { Module } from '@nestjs/common';
import { CategoryTagCategoryTagsController } from './category-tag-category-tags.controller';
import { CategoryTagCategoryTagsService } from './category-tag-category-tags.service';

@Module({
  controllers: [CategoryTagCategoryTagsController],
  providers: [CategoryTagCategoryTagsService]
})
export class CategoryTagCategoryTagsModule {}
