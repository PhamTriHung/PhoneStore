import { Brand } from 'src/brands/brand.entity';
import { ProductStore } from 'src/product-store/product-store.entity';
import { ProductType } from 'src/product-type/product-type.entity';
import { Cart } from 'src/users/cart.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  description: string;

  @Column({ type: 'double' })
  price: number;

  @Column({ type: 'boolean' })
  isInStock: boolean;

  @Column()
  variant: string;

  @Column({ type: 'varchar', length: 50 })
  type: string;

  @OneToMany(() => Cart, (cart) => cart.product)
  carts: Cart[];

  @OneToMany(() => ProductStore, (productStore) => productStore.product)
  productStores: ProductStore[];

  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;

  @ManyToOne(() => ProductType, (productType) => productType.products)
  productType: ProductType;
}
