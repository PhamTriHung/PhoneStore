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

  @Column('varchar')
  couponCode: string;

  @Column({ type: 'float' })
  discountAmount: number;

  @Column({ type: 'bool', default: false })
  isPercentage: boolean;

  @Column({ type: 'datetime', nullable: true })
  startDate: Date;

  @Column({ type: 'datetime', nullable: true })
  endDate: Date;

  @Column({ type: 'int', nullable: true })
  usagelimit: number;

  @Column({ type: 'int', default: 0 })
  currentUsageCount: number;

  @ManyToMany(() => Product, (product) => product.coupons)
  products: Product[];

  @OneToMany(() => Order, (order) => order.coupon)
  orders: Order[];
}
