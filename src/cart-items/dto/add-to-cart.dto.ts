import { PartialType } from '@nestjs/swagger';
import { IsInt, IsUUID, Min } from 'class-validator';
import { CartItem } from '../cart-item.entity';

export class AddToCartDto {
  @IsUUID(4)
  userId: string;

  @IsUUID(4)
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}
