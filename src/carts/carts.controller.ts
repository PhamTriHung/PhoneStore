import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { Cart } from 'src/users/cart.entity';
import { DeleteFromCartDto } from './dto/delete-from-card.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('carts')
export class CartsController {
  constructor(private cartServcie: CartsService) {}

  @Post()
  addToCart(@Body() addToCartDto: AddToCartDto): Promise<Cart> {
    return this.cartServcie.addToCart(addToCartDto);
  }

  @Delete()
  deleteFromCart(@Body() deleteFromCartDto: DeleteFromCartDto) {
    return this.cartServcie.deleteFromCart(deleteFromCartDto);
  }

  @Patch()
  updateCart(@Body() updateCartDto: UpdateCartDto) {
    return this.cartServcie.updateCart(updateCartDto);
  }

  @Get()
  findCartItemByUserId(@Query('userId') userId: string) {
    return this.cartServcie.findCartItemByUserId(userId);
  }
}
