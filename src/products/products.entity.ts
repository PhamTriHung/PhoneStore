import { Cart } from 'src/users/cart.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

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
}
