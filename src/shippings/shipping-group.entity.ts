import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from 'src/orders/order.entity';
import { OrderItem } from 'src/orders/order-item.entity';
import { ShippingStatus } from './shipping-status.entity';
import { ShippingHistory } from './shipping-history.entity';

@Entity()
export class ShippingGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, (order) => order.shippingGroups)
  order: Order;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.shippingGroup)
  orderItems: OrderItem[];

  @ManyToOne(
    () => ShippingStatus,
    (shippingStatus) => shippingStatus.shippingGroups,
  )
  shippingStatus: ShippingStatus;

  @OneToMany(
    () => ShippingHistory,
    (shippingHistory) => shippingHistory.shippingGroup,
  )
  shippingHistories: ShippingHistory[];
}
