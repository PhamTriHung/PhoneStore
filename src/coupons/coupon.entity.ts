import { Product } from 'src/products/products.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Coupon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  discountAmount: number;

  @Column()
  isPercentage: boolean;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  usagelimit: number;

  @Column()
  currentUsageCount: number;

  @ManyToMany(() => Product, (product) => product.coupons)
  products: Product[];
}
