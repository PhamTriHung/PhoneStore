import { Order } from 'src/orders/order.entity';
import { Product } from 'src/products/products.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Coupon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'float' })
  discountAmount: number;

  @Column({ type: 'bool' })
  isPercentage: boolean;

  @Column({ type: 'datetime' })
  startDate: Date;

  @Column({ type: 'datetime' })
  endDate: Date;

  @Column({ type: 'int' })
  usagelimit: number;

  @Column({ type: 'int' })
  currentUsageCount: number;

  @ManyToMany(() => Product, (product) => product.coupons)
  products: Product[];

  @OneToMany(() => Order, (order) => order.coupon)
  orders: Order[];
}
