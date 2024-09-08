import { Module } from '@nestjs/common';
import { CategoryTagCategoryTagsController } from './category-tag-category-tags.controller';
import { CategoryTagCategoryTagsService } from './category-tag-category-tags.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryTagCategory } from 'src/category-tag-categories/category-tag-category.entity';
import { Tag } from 'src/tags/tag.entity';
import { CategoryTagCategoryTag } from './category-tag-category-tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CategoryTagCategory,
      Tag,
      CategoryTagCategoryTag,
    ]),
  ],
  controllers: [CategoryTagCategoryTagsController],
  providers: [CategoryTagCategoryTagsService],
})
export class CategoryTagCategoryTagsModule {}
