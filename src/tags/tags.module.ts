import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { TagCategory } from 'src/tag-categories/tag-category.entity';
import { CategoryTagCategory } from 'src/category-tag-categories/category-tag-category.entity';
import { Category } from 'src/categories/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tag, TagCategory, CategoryTagCategory, Category]),
  ],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
