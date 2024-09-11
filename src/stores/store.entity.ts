import { Ward } from 'src/addresses/ward.entity';
import { ProductStore } from 'src/product-store/product-store.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'nvarchar', length: 50 })
  name: string;

  @Column({ type: 'nvarchar', length: 50 })
  address: string;

  @OneToMany(() => ProductStore, (productStore) => productStore.store)
  productStores: ProductStore[];

  @ManyToOne(() => Ward, (ward) => ward.stores)
  ward: Ward;
}
