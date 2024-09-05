import { Order } from 'src/orders/order.entity';
import { ProductStore } from 'src/product-store/product-store.entity';
import { ShippingGroup } from 'src/shippings/shipping-group.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class OrderItem {
  @PrimaryColumn()
  orderId: string;

  @PrimaryColumn()
  productStoreId: string;

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => ProductStore, (productStore) => productStore)
  @JoinColumn({
    name: 'productStoreId',
    referencedColumnName: 'id',
  })
  productStore: ProductStore;

  @ManyToOne(() => Order, (order) => order.orderItems, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  order: Order;

  @ManyToOne(() => ShippingGroup, (shippingGroup) => shippingGroup.orderItems)
  shippingGroup: ShippingGroup;
}
