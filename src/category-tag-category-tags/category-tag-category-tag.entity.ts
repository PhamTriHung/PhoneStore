import { CategoryTagCategory } from 'src/category-tag-categories/category-tag-category.entity';
import { Tag } from 'src/tags/tag.entity';
import {
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { JoinAttribute } from 'typeorm/query-builder/JoinAttribute';

@Entity()
export class CategoryTagCategoryTag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => CategoryTagCategory,
    (categoryTagCategory) => categoryTagCategory.categoryTagCategoryTags,
  )
  categoryTagCategory: CategoryTagCategory;

  @ManyToOne(() => Tag, (tag) => tag.categoryTagCategoryTags)
  @JoinTable()
  tag: Tag;
}
