import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { Cart } from 'src/users/cart.entity';
import { DeleteFromCartDto } from './dto/delete-from-card.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('carts')
export class CartsController {
  constructor(private cartServcie: CartsService) {}

  @Post()
  addToCart(@Body(ValidationPipe) addToCartDto: AddToCartDto): Promise<Cart> {
    return this.cartServcie.addToCart(addToCartDto);
  }

  @Delete()
  deleteFromCart(
    @Body(ValidationPipe) deleteFromCartDto: DeleteFromCartDto,
  ): Promise<DeleteResult> {
    return this.cartServcie.deleteFromCart(deleteFromCartDto);
  }

  @Patch()
  updateCart(
    @Body(ValidationPipe) updateCartDto: UpdateCartDto,
  ): Promise<UpdateResult> {
    return this.cartServcie.updateCart(updateCartDto);
  }

  @Get()
  findCartItemByUserId(@Query('userId') userId: string): Promise<Cart[]> {
    return this.cartServcie.findCartItemByUserId(userId);
  }
}
