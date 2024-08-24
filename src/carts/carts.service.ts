import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/users/cart.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
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

  deleteFromCart(deleteFromCartDto: DeleteFromCartDto): Promise<DeleteResult> {
    return this.cartRepository.delete(deleteFromCartDto);
  }

  updateCart(updateCartDto: UpdateCartDto): Promise<UpdateResult> {
    const { userId, productId, ...updateField } = updateCartDto;
    return this.cartRepository.update({ userId, productId }, updateField);
  }

  findCartItemByUserId(userId: string): Promise<Cart[]> {
    return this.cartRepository.find({ where: { userId } });
  }
}
