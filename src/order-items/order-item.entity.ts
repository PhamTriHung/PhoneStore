import { Order } from 'src/orders/order.entity';
import { Product } from 'src/products/products.entity';
import { Column, Entity, ManyToOne, Or, PrimaryColumn } from 'typeorm';

@Entity()
export class OrderItem {
  @PrimaryColumn()
  productId: string;

  @PrimaryColumn()
  orderId: string;

  @ManyToOne(() => Product, (product) => product.orderItems)
  product: Product;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  @Column({ type: 'int' })
  quantity: number;
}
