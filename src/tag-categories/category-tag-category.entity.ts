import { Category } from 'src/categories/category.entity';
import {
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';
import { TagCategory } from './tag-category.entity';
import { Tag } from 'src/tags/tag.entity';
import { Product } from 'src/products/products.entity';

@Entity()
export class CategoryTagCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Category, (category) => category.categoryTagCategories)
  category: Category;

  @ManyToOne(
    () => TagCategory,
    (tagCategory) => tagCategory.categoryTagCategories,
  )
  tagCategory: TagCategory;

  @ManyToOne(() => Tag, (tag) => tag.categoryTagCategories)
  tag: Tag;

  @ManyToMany(() => Product, (product) => product.categoryTagCategories)
  products: Product[];
}
