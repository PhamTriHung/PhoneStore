import { Order } from 'src/orders/order.entity';
import { ProductStore } from 'src/product-store/product-store.entity';
import { Product } from 'src/products/products.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class OrderItem {
  @PrimaryColumn()
  productStoreId: string;

  @PrimaryColumn()
  orderId: string;

  @ManyToOne(() => ProductStore, (productStore) => productStore)
  productStore: ProductStore;

  @ManyToOne(() => Order, (order) => order.orderItems, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  order: Order;

  @Column({ type: 'int' })
  quantity: number;
}
