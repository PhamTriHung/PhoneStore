import { Product } from 'src/products/products.entity';
import { CategoryTagCategory } from 'src/category-tag-categories/category-tag-category.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'nvarchar', length: 50 })
  name: string;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  slug: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @OneToMany(
    () => CategoryTagCategory,
    (categoryTagCategory) => categoryTagCategory.category,
  )
  categoryTagCategories: CategoryTagCategory[];

  @ManyToOne(() => Category, (category) => category.childCategories, {
    onDelete: 'SET NULL',
  })
  parentCategory: Category;

  @OneToMany(() => Category, (category) => category.parentCategory, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  childCategories: Category[];
}
