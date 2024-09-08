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
import { CategoryTagCategoryTag } from 'src/category-tag-category-tags/category-tag-category-tag.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'nvarchar', unique: true, length: 50 })
  name: string;

  @OneToMany(
    () => CategoryTagCategoryTag,
    (categoryTagCategoryTag) => categoryTagCategoryTag.tag,
    { cascade: true },
  )
  categoryTagCategoryTags: CategoryTagCategoryTag[];
}
