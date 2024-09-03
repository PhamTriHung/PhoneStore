import { OrderItem } from 'src/orders/order-item.entity';
import { Store } from 'src/stores/store.entity';
import { Variant } from 'src/variants/variant.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class ProductStore {
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

  @OneToMany(() => OrderItem, (orderItem) => orderItem.productStore)
  orderItems: OrderItem[];

  @ManyToOne(() => Store, (store) => store.productStores)
  store: Store;
}
