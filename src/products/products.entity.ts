import { Brand } from 'src/brands/brand.entity';
import { CartItem } from 'src/cart-items/cart-item.entity';
import { Category } from 'src/categories/category.entity';
import { Coupon } from 'src/coupons/coupon.entity';
import { OrderItem } from 'src/orders/order-item.entity';
import { ProductStore } from 'src/product-store/product-store.entity';
import { Review } from 'src/reviews/review.entity';
import { Tag } from 'src/tags/tag.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'nvarchar', length: 50 })
  name: string;

  @Column({ type: 'nvarchar', length: 50 })
  description: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'date', nullable: true })
  releaseDate: Date;

  @Column({ type: 'bool' })
  isMonopoly: boolean;

  @Column({ type: 'float', default: 0.0 })
  rating: number;

  @Column({ type: 'int', default: 0 })
  numOfReview: number;

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems: CartItem[];

  @OneToMany(() => ProductStore, (productStore) => productStore.product)
  productStores: ProductStore[];

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToMany(() => Tag, (tag) => tag.products)
  tags: Tag[];

  @ManyToMany(() => Coupon, (coupon) => coupon.products)
  coupons: Coupon[];
}
