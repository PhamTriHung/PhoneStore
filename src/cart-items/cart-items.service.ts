import { MaxLength } from 'class-validator';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository, UpdateResult } from 'typeorm';
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

  async deleteFromCart(
    deleteFromCartDto: DeleteFromCartDto,
  ): Promise<CartItem> {
    const cartItem = await this.cartItemRepository.findOne({
      where: deleteFromCartDto,
    });

    if (!cartItem) {
      throw new NotFoundException(
        `Cart item with userId ${deleteFromCartDto.userId} and productId ${deleteFromCartDto.productId} not found`,
      );
    } else {
      return this.cartItemRepository.remove(cartItem);
    }
  }

  updateCart(updateCartDto: UpdateCartItemDto): Promise<CartItem> {
    const { userId, productId, ...updateField } = updateCartDto;
    this.cartItemRepository.update({ userId, productId }, updateField);

    return this.cartItemRepository.findOne({ where: { userId, productId } });
  }

  async findCartItemByUserId(userId: string): Promise<CartItem[]> {
    const cartItems = await this.cartItemRepository.find({ where: { userId } });
    return cartItems;
  }

  find(): Promise<CartItem[]> {
    return this.cartItemRepository.find();
  }
}
