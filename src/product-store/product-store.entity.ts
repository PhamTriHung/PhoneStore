import { Product } from 'src/products/products.entity';
import { Store } from 'src/stores/store.entity';
import { Entity, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class ProductStore {
  @PrimaryColumn()
  productId: string;

  @PrimaryColumn()
  storeId: string;

  @ManyToOne(() => Product, (product) => product.productStores)
  product: Product;

  @ManyToOne(() => Store, (store) => store.productStores)
  store: Store;
}
