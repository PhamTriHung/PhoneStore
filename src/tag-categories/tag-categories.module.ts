import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TagCategoriesController } from './tag-categories.controller';
import { TagCategoriesService } from './tag-categories.service';
import { TagCategory } from './tag-category.entity';
import { Category } from 'src/categories/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TagCategory, Category])],
  controllers: [TagCategoriesController],
  providers: [TagCategoriesService],
})
export class TagCategoriesModule {}
