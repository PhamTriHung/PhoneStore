import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { Category } from 'src/categories/category.entity';
import { Tag } from 'src/tags/tag.entity';
import { Attribute } from 'src/attributes/attribute.entity';
import { AttributeValue } from 'src/attributes/attribute-value.entity';
import { Variant } from 'src/variants/variant.entity';
import { CategoryTagCategory } from 'src/category-tag-categories/category-tag-category.entity';
import { Review } from 'src/reviews/review.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Category,
      Tag,
      AttributeValue,
      Variant,
      CategoryTagCategory,
      Review,
    ]),
  ],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
