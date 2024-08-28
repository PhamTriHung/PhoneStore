import { Product } from 'src/products/products.entity';
import { Store } from 'src/stores/store.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class ProductStore {
  @PrimaryColumn()
  productId: string;

  @PrimaryColumn()
  storeId: string;

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => Product, (product) => product.productStores, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  product: Product;

  @ManyToOne(() => Store, (store) => store.productStores)
  store: Store;
}
