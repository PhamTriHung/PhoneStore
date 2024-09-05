import { CartItem } from 'src/cart-items/cart-item.entity';
import { OrderItem } from 'src/orders/order-item.entity';
import { Store } from 'src/stores/store.entity';
import { Variant } from 'src/variants/variant.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ProductStore {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn()
  variantId: string;

  @PrimaryColumn()
  storeId: string;

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => Variant, (variant) => variant.productStores, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  variant: Variant;

  @ManyToOne(() => Store, (store) => store.productStores)
  store: Store;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.productStore)
  orderItems: OrderItem[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.productStore)
  cartItems: CartItem[];
}
