import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { DeleteFromCartDto } from './dto/delete-from-card.dto';
import { CartItem } from './cart-item.entity';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartItemsService {
  constructor(
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
  ) {}

  addToCart(addToCartDto: AddToCartDto): Promise<CartItem> {
    const newCartItem = this.cartItemRepository.create(addToCartDto);
    return this.cartItemRepository.save(newCartItem);
  }

  deleteFromCart(deleteFromCartDto: DeleteFromCartDto): Promise<DeleteResult> {
    return this.cartItemRepository.delete(deleteFromCartDto);
  }

  updateCart(updateCartDto: UpdateCartItemDto): Promise<UpdateResult> {
    const { userId, productId, ...updateField } = updateCartDto;
    return this.cartItemRepository.update({ userId, productId }, updateField);
  }

  findCartItemByUserId(userId: string): Promise<CartItem[]> {
    return this.cartItemRepository.find({ where: { userId } });
  }

  find() {
    return this.cartItemRepository.find();
  }
}
