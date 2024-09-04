import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Cart } from 'src/carts/cart.entity';
import { ProductStore } from 'src/product-store/product-store.entity';

@Entity()
export class CartItem {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  productId: string;

  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  cart: Cart;

  @ManyToOne(() => ProductStore, (productStore) => productStore.cartItems)
  productStore: ProductStore;

  @Column({ type: 'int', default: 1 })
  quantity: number;
}
