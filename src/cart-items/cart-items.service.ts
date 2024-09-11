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

  async deleteFromCart(id: string): Promise<CartItem> {
    const cartItem = await this.cartItemRepository.findOne({
      where: { id },
    });

    if (!cartItem) {
      throw new NotFoundException(`Cart item with id ${id} not found`);
    } else {
      return this.cartItemRepository.remove(cartItem);
    }
  }

  updateCart(id: string, updateCartDto: UpdateCartItemDto): Promise<CartItem> {
    const { ...updateField } = updateCartDto;
    this.cartItemRepository.update({ id }, updateField);

    return this.cartItemRepository.findOneBy({ id });
  }

  find(): Promise<CartItem[]> {
    return this.cartItemRepository.find();
  }
}
