import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/products.entity';
import { CategoryTagCategory } from 'src/tag-categories/category-tag-category.entity';
import { TagCategory } from 'src/tag-categories/tag-category.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'nvarchar', unique: true, length: 50 })
  name: string;

  @ManyToMany(() => Product, (product) => product.tags)
  products: Product[];

  @ManyToOne(
    () => CategoryTagCategory,
    (categoryTagCategory) => categoryTagCategory.tags,
  )
  categoryTagCategory: CategoryTagCategory;
}
