import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsUUID, Min } from 'class-validator';
import { CartItem } from '../cart-item.entity';

export class AddToCartDto extends PartialType(CartItem) {
  @IsUUID(4)
  userId: string;

  @IsUUID(4)
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}
