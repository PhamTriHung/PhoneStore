import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<CartItem> {
    return this.cartItemService.deleteFromCart(id);
  }

  @Patch()
  updateCart(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(ValidationPipe) updateCartItemDto: UpdateCartItemDto,
  ): Promise<CartItem> {
    return this.cartItemService.updateCart(id, updateCartItemDto);
  }

  @Get()
  findAllCartItem() {
    return this.cartItemService.find();
  }
}
