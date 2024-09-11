import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Category } from './category.entity';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TagCategory } from 'src/tag-categories/tag-category.entity';
import { CategoryTagCategory } from 'src/category-tag-categories/category-tag-category.entity';
import { Product } from 'src/products/products.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Category,
      TagCategory,
      CategoryTagCategory,
      Product,
    ]),
  ],
  providers: [CategoriesService],
  controllers: [CategoriesController],
})
export class ProductTypeModule {}
