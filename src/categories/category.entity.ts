import { Brand } from 'src/brands/brand.entity';
import { Product } from 'src/products/products.entity';
import { TagCategory } from 'src/tag-categories/tag-category.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'nvarchar', length: 50 })
  value: string;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  slug: string;

  @ManyToMany(() => Brand, (brand) => brand.productTypes)
  @JoinTable()
  brands: Brand[];

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @OneToMany(() => TagCategory, (tagCategory) => tagCategory.category)
  tagCategories: TagCategory[];

  @ManyToOne(() => Category, (category) => category.childCategories)
  parentCategory: Category;

  @OneToMany(() => Category, (category) => category.parentCategory, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  childCategories: Category[];
}
