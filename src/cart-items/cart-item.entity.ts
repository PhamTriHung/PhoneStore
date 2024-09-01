import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../users/users.entity';
import { Product } from 'src/products/products.entity';

@Entity()
export class CartItem {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  productId: string;

  @ManyToOne(() => User, (user) => user.cartItems)
  user: User;

  @ManyToOne(() => Product, (product) => product.cartItems)
  product: Product;

  @Column({ type: 'int', default: 1 })
  quantity: number;
}
