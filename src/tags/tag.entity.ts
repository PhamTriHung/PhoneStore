import { Product } from 'src/products/products.entity';
import { TagCategory } from 'src/tag-categories/tag-category.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true, length: 50 })
  name: string;

  @ManyToMany(() => Product, (product) => product.tags)
  @JoinTable()
  products: Product[];

  @ManyToOne(() => TagCategory, (tagCategory) => tagCategory.tags)
  tagCategory: TagCategory;
}
