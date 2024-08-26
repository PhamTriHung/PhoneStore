import { Brand } from 'src/brands/brand.entity';
import { Category } from 'src/categories/category.entity';
import { ProductStore } from 'src/product-store/product-store.entity';
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

  @Column({ type: 'date', nullable: true })
  releaseDate: Date;

  @Column({ type: 'boolean' })
  isMonopoly: boolean;

  @OneToMany(() => Cart, (cart) => cart.product)
  carts: Cart[];

  @OneToMany(() => ProductStore, (productStore) => productStore.product)
  productStores: ProductStore[];

  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
