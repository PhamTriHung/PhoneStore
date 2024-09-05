import { Category } from 'src/categories/category.entity';
import { Tag } from 'src/tags/tag.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryTagCategory } from './category-tag-category.entity';

@Entity()
export class TagCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'nvarchar', length: 50, unique: true })
  name: string;

  @OneToMany(
    () => CategoryTagCategory,
    (categoryTagCategory) => categoryTagCategory.tagCategory,
  )
  categoryTagCategories: CategoryTagCategory[];
}
