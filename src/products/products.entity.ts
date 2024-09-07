import { Category } from 'src/categories/category.entity';
import { Coupon } from 'src/coupons/coupon.entity';
import { Review } from 'src/reviews/review.entity';
import { CategoryTagCategory } from 'src/category-tag-categories/category-tag-category.entity';
import { Variant } from 'src/variants/variant.entity';
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
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  slug: string;

  @Column({ type: 'nvarchar', length: 50 })
  name: string;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  description: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'date', nullable: true })
  releaseDate: Date;

  @Column({ type: 'bool', default: false })
  isMonopoly: boolean;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @Column({ type: 'float', default: 0.0 })
  rating: number;

  @Column({ type: 'int', default: 0 })
  numOfReview: number;

  @OneToMany(() => Review, (review) => review.product, { cascade: true })
  reviews: Review[];

  @OneToMany(() => Variant, (variant) => variant.product, { cascade: true })
  variants: Variant[];

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToMany(
    () => CategoryTagCategory,
    (categoryTagCategory) => categoryTagCategory.products,
  )
  @JoinTable()
  categoryTagCategories: CategoryTagCategory[];

  @ManyToMany(() => Coupon, (coupon) => coupon.products)
  @JoinTable()
  coupons: Coupon[];
}
