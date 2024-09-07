import { Module } from '@nestjs/common';
import { CategoryTagCategoriesController } from './category-tag-categories.controller';
import { CategoryTagCategoriesService } from './category-tag-categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryTagCategory } from './category-tag-category.entity';
import { Category } from 'src/categories/category.entity';
import { TagCategory } from 'src/tag-categories/tag-category.entity';
import { Tag } from 'src/tags/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryTagCategory, Category, TagCategory, Tag]),
  ],
  controllers: [CategoryTagCategoriesController],
  providers: [CategoryTagCategoriesService],
})
export class CategoryTagCategoriesModule {}
