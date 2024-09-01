import { Category } from 'src/categories/category.entity';
import { Tag } from 'src/tags/tag.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TagCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'nvarchar', length: 50, unique: true })
  name: string;

  @OneToMany(() => Tag, (tag) => tag.tagCategory)
  tags: Tag[];

  @ManyToOne(() => Category, (category) => category.tagCategories)
  category: Category;
}
