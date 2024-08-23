import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/users/cart.entity';
import { Repository } from 'typeorm';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { DeleteFromCartDto } from './dto/delete-from-card.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
  ) {}

  addToCart(addToCartDto: AddToCartDto): Promise<Cart> {
    const newCartItem = this.cartRepository.create(addToCartDto);
    return this.cartRepository.save(newCartItem);
  }

  deleteFromCart(deleteFromCartDto: DeleteFromCartDto) {
    return this.cartRepository.delete(deleteFromCartDto);
  }

  updateCart(updateCartDto: UpdateCartDto) {
    const { userId, productId, quantity } = updateCartDto;
    return this.cartRepository.update({ userId, productId }, { quantity });
  }

  findCartItemByUserId(userId: string) {
    return this.cartRepository.find({ where: { userId } });
  }
}
