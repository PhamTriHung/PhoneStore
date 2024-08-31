import { Brand } from 'src/brands/brand.entity';
import { CartItem } from 'src/cart-items/cart-item.entity';
import { Category } from 'src/categories/category.entity';
import { OrderItem } from 'src/order-items/order-item.entity';
import { ProductStore } from 'src/product-store/product-store.entity';
import { Review } from 'src/reviews/review.entity';
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

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems: CartItem[];

  @OneToMany(() => OrderItem, (cart) => cart.product)
  orderItems: OrderItem[];

  @OneToMany(() => ProductStore, (productStore) => productStore.product)
  productStores: ProductStore[];

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
