import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryTagCategory } from '../category-tag-categories/category-tag-category.entity';

@Entity()
export class TagCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'nvarchar', length: 50, unique: true })
  name: string;

  @OneToMany(
    () => CategoryTagCategory,
    (categoryTagCategory) => categoryTagCategory.tagCategory,
    { cascade: true },
  )
  categoryTagCategories: CategoryTagCategory[];
}
