import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './users.entity';
import { Product } from 'src/products/products.entity';

@Entity()
export class Cart {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  productId: string;

  @ManyToOne(() => User, (user) => user.carts)
  user: User;

  @ManyToOne(() => Product, (product) => product.carts)
  product: Product;

  @Column({ type: 'int' })
  quantity: number;
}
