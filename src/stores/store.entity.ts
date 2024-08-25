import { ProductStore } from 'src/product-store/product-store.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  address: string;

  @OneToMany(() => ProductStore, (productStore) => productStore.store)
  productStores: ProductStore[];
}
