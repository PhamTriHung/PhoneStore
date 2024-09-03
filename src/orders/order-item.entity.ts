import { Order } from 'src/orders/order.entity';
import { ProductStore } from 'src/product-store/product-store.entity';
import { ShippingGroup } from 'src/shippings/shipping-group.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class OrderItem {
  @PrimaryColumn()
  productStoreId: string;

  @PrimaryColumn()
  orderId: string;

  @ManyToOne(() => ProductStore, (productStore) => productStore)
  productStore: ProductStore;

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => Order, (order) => order.orderItems, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  order: Order;

  @ManyToOne(() => ShippingGroup, (shippingGroup) => shippingGroup.orderItems)
  shippingGroup: ShippingGroup;
}
