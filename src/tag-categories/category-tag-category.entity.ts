import { Category } from 'src/categories/category.entity';
import { Entity, OneToMany, ManyToOne } from 'typeorm';
import { TagCategory } from './tag-category.entity';
import { Tag } from 'src/tags/tag.entity';

@Entity()
export class CategoryTagCategory {
  @ManyToOne(() => Category, (category) => category.categoryTagCategories)
  category: Category;

  @ManyToOne(() => Category, (tagCategory) => tagCategory.categoryTagCategories)
  tagCategory: TagCategory;

  @OneToMany(() => Tag, (tag) => tag.categoryTagCategory)
  tags: Tag[];
}
