import {
  Body,
  Controller,
  Delete,
  Get,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { DeleteFromCartDto } from './dto/delete-from-card.dto';
import { CartItemsService } from './cart-items.service';
import { CartItem } from './cart-item.entity';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('cart-items')
@Controller('cart-items')
export class CartItemsController {
  constructor(private cartItemService: CartItemsService) {}

  @Post()
  addToCart(
    @Body(ValidationPipe) addToCartDto: AddToCartDto,
  ): Promise<CartItem> {
    return this.cartItemService.addToCart(addToCartDto);
  }

  @Delete()
  deleteFromCart(
    @Body(ValidationPipe) deleteFromCartDto: DeleteFromCartDto,
  ): Promise<CartItem> {
    return this.cartItemService.deleteFromCart(deleteFromCartDto);
  }

  @Patch()
  updateCart(
    @Body(ValidationPipe) updateCartItemDto: UpdateCartItemDto,
  ): Promise<CartItem> {
    return this.cartItemService.updateCart(updateCartItemDto);
  }

  @Get()
  findAllCartItem() {
    return this.cartItemService.find();
  }

  @Get('search')
  findCartItemByUserId(
    @Query('userId', new ParseUUIDPipe({ version: '4' })) userId?: string,
  ): Promise<CartItem[]> {
    return this.cartItemService.findCartItemByUserId(userId);
  }
}
