import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/products.entity';
import { CategoryTagCategory } from 'src/category-tag-categories/category-tag-category.entity';
import { TagCategory } from 'src/tag-categories/tag-category.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'nvarchar', unique: true, length: 50 })
  name: string;

  @ManyToMany(() => Product, (product) => product.categoryTagCategories)
  products: Product[];

  @OneToMany(
    () => CategoryTagCategory,
    (categoryTagCategory) => categoryTagCategory.tag,
    { cascade: true },
  )
  categoryTagCategories: CategoryTagCategory[];
}
