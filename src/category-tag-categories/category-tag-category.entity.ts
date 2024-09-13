import { Category } from 'src/categories/category.entity';
import {
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  ManyToMany,
  Column,
  Unique,
  JoinColumn,
} from 'typeorm';
import { TagCategory } from '../tag-categories/tag-category.entity';
import { Tag } from 'src/tags/tag.entity';
import { Product } from 'src/products/products.entity';
import { CategoryTagCategoryTag } from 'src/category-tag-category-tags/category-tag-category-tag.entity';

@Entity()
export class CategoryTagCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column({ type: 'varchar' })
  // categoryId: string;

  // @Column({ type: 'varchar' })
  // tagCategoryId: string;

  @ManyToOne(() => Category, (category) => category.categoryTagCategories, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @ManyToOne(
    () => TagCategory,
    (tagCategory) => tagCategory.categoryTagCategories,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'tagCategoryId' })
  tagCategory: TagCategory;

  @OneToMany(
    () => CategoryTagCategoryTag,
    (categoryTagCategoryTag) => categoryTagCategoryTag.categoryTagCategory,
    {
      onDelete: 'CASCADE',
    },
  )
  categoryTagCategoryTags: CategoryTagCategoryTag[];
}
