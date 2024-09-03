import { Coupon } from 'src/coupons/coupon.entity';
import { OrderItem } from 'src/orders/order-item.entity';
import { ShippingGroup } from 'src/shippings/shipping-group.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'datetime', nullable: false })
  orderApprovedAt: Date;

  @Column({ type: 'datetime' })
  orderDeliveredDate: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @OneToMany(() => ShippingGroup, (shippingGroup) => shippingGroup.order)
  shippingGroups: ShippingGroup[];

  @ManyToOne(() => Coupon, (coupon) => coupon.orders)
  coupon: Coupon;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;
}
